const Session = require("../models/sessionModel");
const userModel = require("../models/userModel");
const tempToken = require("../models/tempTokenModel");
const UserOTPVerification = require("../models/userOTPVerificationModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const mongoose = require("mongoose");



const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: true,
  port: 587,
  auth: {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_APP_PASSWORD
  },
  tls: {
    ciphers: 'TLSv1.2',
    rejectUnauthorized: false
  }
});



const userController =
{
  register: async (req, res) => {
    const { username, email, password, role, DOB, name, address } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash and salt the password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user with the hashed password
      const newUser = new userModel({ username, email, hashedPassword, salt, DOB, address, role, name });
      await newUser.save()
        .then(result => {
          // get the user id
          const userId = result._id;
          // delete all the previous OTP records
          UserOTPVerification.deleteMany({ userId });
          // generate a new OTP
          var secret = speakeasy.generateSecret({
            name: "Login MFA secret",
            length: 20
          });
          console.log(secret);
          QRCode.toDataURL(secret.otpauth_url, function (err, data_url) {
            console.log("start" + data_url + "end");
          })
          // store secret.ascii in the database
          const newOTPVerification = new UserOTPVerification({ userId, secret: secret.ascii, otpauth_url: secret.otpauth_url, createdAt: Date.now() });
          newOTPVerification.save()
            .then(result => {
              console.log("result" + result);
            })
            .catch(err => {
              console.log(err);
              res.json({
                status: "FAILED",
                message: "OTP could not be created",
                error: err.message,
              });
            });
          // return with successful status code
          console.log("result" + result);
          res.status(200).json({ result });
        })
        .catch(err => {
          console.log(err);
          res.json({
            status: "FAILED",
            message: "User could not be created",
            error: err.message,
          });
        });
    }
    catch (error) {
      res.json({
        status: "FAILED",
        message: "User could not be created",
        error: error.message,
      });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const { email, otp } = req.body;
      const user = await userModel.findOne({ email });
      const userId = user._id;
      const otpVerification = await UserOTPVerification.findOne({ userId });
      if (!otpVerification) {
        return res.json({
          status: "FAILED",
          message: "OTP verification failed",
          error: "OTP record not found",
        });
      }
      const isMatch = await bcrypt.compare(otp, otpVerification.otp);
      if (!isMatch) {
        return res.json({
          status: "FAILED",
          message: "OTP verification failed",
          error: "OTP is incorrect",
        });
      }
      if (Date.now() > otpVerification.expiresAt) {
        return res.json({
          status: "FAILED",
          message: "OTP verification failed",
          error: "OTP has expired",
        });
      }
      await userModel.findByIdAndUpdate(userId, { verifiedEmail: true });
      res.json({
        status: "SUCCESS",
        message: "OTP verified successfully",
      });
    } catch (error) {
      res.json({
        status: "FAILED",
        message: "OTP verification failed",
        error: error.message,
      });
    }
  },
  enableMFA: async (req, res) => {
    // Check if the user has cookies
    if (!req.cookies.token) return res.json({ message: "unauthorized access" });
    const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    const userId = decoded.user.userId;
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.json({
          status: "FAILED",
          message: "User not found",
        });
      }
  
      // Update MFAEnabled property
      user.MFAEnabled = true;
      user.canPass = false;
  
      // Save the changes to the database
      await user.save();
  
      res.json({
        status: "SUCCESS",
        message: "MFA enabled successfully",
      });
    } catch (error) {
      res.json({
        status: "FAILED",
        message: "MFA could not be enabled",
        error: error.message,
      });
    }
  },
  disableMFA: async (req, res) =>
  { 
     // Check if the user has cookies
     if (!req.cookies.token) return res.json({ message: "unauthorized access" });
     const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
     const userId = decoded.user.userId;
     try {
       const user = await userModel.findById(userId);
       if (!user) {
         return res.json({
           status: "FAILED",
           message: "User not found",
         });
       }
   
       // Update MFAEnabled property
       user.MFAEnabled = false;
       user.canPass = true;
   
       // Save the changes to the database
       await user.save();
   
       res.json({
         status: "SUCCESS",
         message: "MFA disabled successfully",
       });
     } catch (error) {
       res.json({
         status: "FAILED",
         message: "MFA could not be disabled",
         error: error.message,
       });
     }
  },



  verifyOTPLogin: async (req, res) => {
    try
    {
      const { email, otp } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(405).json({ status: "FAILED", message: "User not found" });
      }
      const userId = user._id;
      const otpVerification = await UserOTPVerification.findOne({ userId });
      if (!otpVerification) 
      {
        return res.status(405).json({ status: "FAILED", message: "OTP verification failed" });
      }
      const isMatch = await bcrypt.compare(otp, otpVerification.otp);
      if (!isMatch) 
      {
        return res.status(405).json({ status: "FAILED", message: "OTP verification failed" });
      }
      if (Date.now() > otpVerification.expiresAt) 
      {
        return res.status(405).json({ status: "FAILED", message: "OTP verification failed" });
      }
      // Update canPass property
      const currentDateTime = new Date();
        const expiresAt = new Date(+currentDateTime + 1800000); // expire in 3 minutes
        // Generate a JWT token
        const token = jwt.sign(
          { user: { userId: user._id, role: user.role } },
          secretKey,
          {
            expiresIn: 3 * 60 * 60,
          }
          );
          user.canPass = true;

          let newSession = new Session({
            userId: user._id,
            token,
            expiresAt: expiresAt,
          });
          await newSession.save();
          return res
          .cookie("token", token, {
            expires: expiresAt,
            withCredentials: true,
            httpOnly: false,
            SameSite:'none',
            MFAEnabled: user.MFAEnabled,
          })
          .status(200)
          .json({ status: "SUCCESS", message: "OTP verified successfully" });
    } 
    catch (error) 
    {
      console.log(error);
      res.status(400).json({ status: "FAILED", message: "OTP verification failed" });
    }
  },

  

  verifyOTPLogin2: async (req, res) => {
    try {
      const { email, enteredOTP } = req.body;
      const user = await userModel.findOne({ email });
      const userId = user._id;
      // get temp token generated when user triggers login
      const tempTok = await tempToken.findOne({ userId });
      if (!tempTok || Date.now() > tempTok.expiresAt) {
        return res.json({
          status: "FAILED",
          message: "OTP verification failed -- Temp token expired or not found",
        });
      }
      // get the actual secret from the database
      const otpVerification = await UserOTPVerification.findOne({ userId: userId });
      if (!otpVerification) {
        return res.json({
          status: "FAILED",
          message: "OTP verification failed -- This user doesn't have a registered OTP",
        });
      }
      console.log("reached1")
      const storedSecret = otpVerification.secret;
      const verified = speakeasy.totp.verify({
        secret: storedSecret,
        encoding: 'ascii',
        token: enteredOTP,
      });
      console.log("reached2")

      if (verified) {
        // establish a session and log user in
        const currentDateTime = new Date();
        const expiresAt = new Date(+currentDateTime + 1800000); // expire in 3 minutes
        // Generate a JWT token
        const token = jwt.sign(
          { user: { userId: user._id, role: user.role } },
          secretKey,
          {
            expiresIn: 3 * 60 * 60,
          }
        );
        console.log("reached3")
        let newSession = new Session({
          userId: user._id,
          token,
          expiresAt: expiresAt,
        });
        console.log("reached4");
        console.log(user.role);
        await newSession.save();
        return res
          .cookie("token", token, {
            expires: expiresAt,
            withCredentials: true,
            httpOnly: false,
            SameSite: 'none',
            MFAEnabled: user.MFAEnabled,
          })
          .status(200)
          .json({ 
          message: "MFA correct,login successful",
          MFAEnabled: user.MFAEnabled, 
          role: user.role });
      } else {
        return res.status(400).json({
          status: "FAILED",
          message: "OTP verification failed",
        });
      }
    }
    catch (error) {
      res.json({
        status: "FAILED",
        message: "OTP verification failed",
        error: error.message,
      });
    }
  },



  // verifyOTPLogin: async (req, res) => {
  //   try {
  //     const { email, otp } = req.body;
  //     const user = await userModel.findOne({ email });
  //     if (!user) {
  //       return res.status(405).json({ status: "FAILED", message: "User not found" });
  //     }
  //     const userId = user._id;
  //     const otpVerification = await UserOTPVerification.findOne({ userId });
  //     if (!otpVerification) {
  //       return res.status(405).json({ status: "FAILED", message: "OTP verification failed" });
  //     }
  //     const isMatch = await bcrypt.compare(otp, otpVerification.otp);
  //     if (!isMatch) {
  //       return res.status(405).json({ status: "FAILED", message: "OTP verification failed" });
  //     }
  //     if (Date.now() > otpVerification.expiresAt) {
  //       return res.status(405).json({ status: "FAILED", message: "OTP verification failed" });
  //     }
  //     // Update canPass property
  //     const currentDateTime = new Date();
  //     const expiresAt = new Date(+currentDateTime + 1800000); // expire in 3 minutes
  //     // Generate a JWT token
  //     const token = jwt.sign(
  //       { user: { userId: user._id, role: user.role } },
  //       secretKey,
  //       {
  //         expiresIn: 3 * 60 * 60,
  //       }
  //     );
  //     user.canPass = true;

  //     let newSession = new Session({
  //       userId: user._id,
  //       token,
  //       expiresAt: expiresAt,
  //     });
  //     await newSession.save();
  //     return res
  //       .cookie("token", token, {
  //         expires: expiresAt,
  //         withCredentials: true,
  //         httpOnly: false,
  //         SameSite: 'none',
  //         MFAEnabled: user.MFAEnabled,
  //       })
  //       .status(200)
  //       .json({ status: "SUCCESS", message: "OTP verified successfully" });
  //   }
  //   catch (error) {
  //     console.log(error);
  //     res.status(400).json({ status: "FAILED", message: "OTP verification failed" });
  //   }
  // },

  logout: async (req, res) => {
    try {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.user.userId;
      // change canPass in user to false
      res.clearCookie('token');
      res.status(200).json({ message: "logout successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },



  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "email not found" });
      }
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!passwordMatch) {
        return res.status(405).json({ message: "incorect password" });
      }


      // Check if the user has enabled MFA
      if (user.MFAEnabled) {
        console.log("MFA enabled");
        // delete all the previous MFA tokens
        await UserOTPVerification.deleteMany({ userId: user._id });
        // generate a new MFA token
        // sendOTPVerificationEmail(user, res);
        // return with successful status code
        return res.status(200).json({ message: "Verify MFA" });
      }
      else {
        // establish a session and log user in
        const currentDateTime = new Date();
        const expiresAt = new Date(+currentDateTime + 1800000); // expire in 3 minutes
        // Generate a JWT token
        const token = jwt.sign(
          { user: { userId: user._id, role: user.role } },
          secretKey,
          {
            expiresIn: 3 * 60 * 60,
          }
        );
        let newSession = new Session({
          userId: user._id,
          token,
          expiresAt: expiresAt,
        });
        await newSession.save();
        return res
          .cookie("token", token, {
            expires: expiresAt,
            withCredentials: true,
            httpOnly: false,
            SameSite: 'none',
            MFAEnabled: user.MFAEnabled,
          })
          .status(200)
          .json({ message: "login successfully", MFAEnabled: user.MFAEnabled, role: user.role });
      }

    }
    catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },


  login2: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "email not found" });
      }
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!passwordMatch) {
        return res.status(405).json({ message: "incorect password" });
      }

      // Check if the user has enabled MFA
      if (user.MFAEnabled) {
        //create a temp token
        // hash the otp
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newTempToken = await new tempToken({
          userId: user._id,
          otp: hashedOTP,
          createdAt: Date.now(),
          expiresAt: Date.now() + 180000, // expire in 3 minutes
        });
        // delete all previous temp tokens
        await tempToken.deleteMany({ userId: user._id });
        // save the OTP record in the database
        await newTempToken.save();
        console.log(newTempToken);
        // redirect to the OTP page with status code redirected
        return res.status(200).json({ message: "Verify MFA", userId: user._id, email: user.email, MFAEnabled: true });

      }
      else {
        // establish a session and log user in
        const currentDateTime = new Date();
        const expiresAt = new Date(+currentDateTime + 1800000); // expire in 3 minutes
        // Generate a JWT token
        const token = jwt.sign(
          { user: { userId: user._id, role: user.role } },
          secretKey,
          {
            expiresIn: 3 * 60 * 60,
          }
        );
        let newSession = new Session({
          userId: user._id,
          token,
          expiresAt: expiresAt,
        });
        await newSession.save();
        return res
          .cookie("token", token, {
            expires: expiresAt,
            withCredentials: true,
            httpOnly: false,
            SameSite: 'none',
            MFAEnabled: user.MFAEnabled,
          })
          .status(200)
          .json({ message: "login successfully", MFAEnabled: user.MFAEnabled, role: user.role });
      }
    }
    catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

}


module.exports = userController;


const sendOTPVerificationEmail = async ({ _id, email }, res) => {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  try {
    // mail options
    const mailOptions = {
      from: process.env.OUTLOOK_USER,
      to: email,
      subject: "OTP Verification",
      html: `
        <p>Hello!</p>
        <p>Your OTP for verification is: <b>${otp}</b></p>
        <p>Please enter this OTP in the app to verify your email address.</p>
        <p>Remember, the OTP will expire in 1 hour.</p>
        <p>If you didn't request this OTP, you can safely ignore this email.</p>
        <p>Thank you!</p>
      `,
    };
    // hash the otp
    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPVerification = await new UserOTPVerification({
      userId: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    // save the OTP record in the database
    await newOTPVerification.save();
    await transporter.sendMail(mailOptions);
    res.json({
      status: "PENDING",
      message: "OTP sent successfully",
      data: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    try {
      var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: true,
        port: 587,
        auth: {
          user: process.env.OUTLOOK_USER2,
          pass: process.env.OUTLOOK_APP_PASSWORD
        },
        tls: {
          ciphers: 'TLSv1.2',
          rejectUnauthorized: false
        }
      });
      const mailOptions = {  // the content of the email that will be sent to the user
        from: process.env.OUTLOOK_USER2,
        to: email,
        subject: "OTP Token",
        html: `
        <p>Hello!</p>
        <p>Your OTP for verification is: <b>${otp}</b></p>
        <p>Please enter this OTP in the app to verify your email address.</p>
        <p>Remember, the OTP will expire in 1 hour.</p>
        <p>If you didn't request this OTP, you can safely ignore this email.</p>
        <p>Thank you!</p>
      `,
      };

      await transporter.sendMail(mailOptions);
      res.json({
        status: "PENDING",
        message: "OTP sent successfully",
        data: {
          userId: _id,
          email,
        },
      });
    }
    catch (error) {
      res.json({
        status: "FAILED",
        message: "OTP could not be sent",
        error: error.message,
      });
    };

  }
}