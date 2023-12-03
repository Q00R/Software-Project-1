const Session = require("../models/sessionModel");
const userModel = require("../models/userModel");
const ticketModel = require("../models/ticketModel");
const UserOTPVerification = require("../models/UserOTPVerificationModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey =process.env.SECRET_KEY ;
const bcrypt = require("bcrypt");


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
   //respond to user ticket
   respondToAgentTicket: async (req, res) => {
    try {
        const id = req.params.ticketId;
        const response = req.body.response;
        const userId = req.body.userId;
        if(!id || !response){
            return res.status(400).json({ error: "Missing required fields!" });
        }

        const ticket = await ticketModel.findById(id);
        
       
        if (!ticket) {
            return res.status(400).json({ error: "Ticket not found!" });
          }

          if(ticket.userId != userId){
            return res.status(400).json({ error: "Wrong User!" });
        }
    
          if (ticket.status === "Closed") {
            return res.status(400).json({ error: "Ticket is closed! If you are not satisfied, you can request a live chat by pressing on the below button." });
          }


          ticket.Messages.ClientMessages.push({
            message: response,
          });
          await ticket.save();
          return res.status(200).json({ message: "Response Sent Successfully!" });
        } catch (e) {
          console.error(e);
          return res.status(500).json({ error: "An Error has Occured" });
        }
      },
  register: async (req, res) => 
  {
    const { username ,email, password, role, DOB, name, address } = req.body;

    try 
    {
      // Check if the user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) 
      {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash and salt the password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user with the hashed password
      const newUser = new userModel({ username, email, hashedPassword, salt, role, DOB, name, address, verified: false });
      await newUser.save()
      .then(result => 
      {
        sendOTPVerificationEmail(result, res);
      })
      .catch(err => 
      {
        console.log(err);
        res.json({
          status:"FAILED",
          message: "User could not be created",
          error: err.message,
        });
      });
    }
    catch (error) 
    {
      res.json({
        status:"FAILED",
        message: "User could not be created",
        error: error.message,
      });
    }
  },
  verifyOTP: async (req, res) =>
  {
    try {
      const { userId, otp } = req.body;
      const otpVerification = await UserOTPVerification.findOne({ userId });
      if (!otpVerification) {
        return res.json({
          status:"FAILED",
          message: "OTP verification failed",
          error: "OTP record not found",
        });
      }
      const isMatch = await bcrypt.compare(otp, otpVerification.otp);
      if (!isMatch) {
        return res.json({
          status:"FAILED",
          message: "OTP verification failed",
          error: "OTP is incorrect",
        });
      }
      if (Date.now() > otpVerification.expiresAt) {
        return res.json({
          status:"FAILED",
          message: "OTP verification failed",
          error: "OTP has expired",
        });
      }
      await userModel.findByIdAndUpdate(userId, { verified: true });
      res.json({
        status:"SUCCESS",
        message: "OTP verified successfully",
      });
    } catch (error) {
      res.json({
        status:"FAILED",
        message: "OTP verification failed",
        error: error.message,
      });
    }
  },
  enableMFA: async (req, res) => {
    const { userId } = req.body;
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
  
  disabdisableMFA: async (req, res) =>
  {
    const {userId} = req.body;
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.json({
          status:"FAILED",
          message: "User not found",
        });
      }
      user.MFAEnabled = false;
    } catch (error) {
      res.json({
        status:"FAILED",
        message: "MFA could not be disabled",
        error: error.message,
      });
    }
  },

  login: async (req, res) =>
  {
    // we need to check first if the user enables the MFA or not.
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "email not found" });
      }

      console.log("password: ", user.hashedPassword);
      // Check if the password is correct


      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!passwordMatch) {
        return res.status(405).json({ message: "incorect password" });
      }

      // Check if the user has enabled MFA
      if (user.MFAEnabled) 
      {
        // loop to make all other MFA tokens expired and set a new one
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
        
      }

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
          SameSite:'none'
        })
        .status(200)
        .json({ message: "login successfully", user });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}


module.exports = userController;


const sendOTPVerificationEmail = async ({_id, email}, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

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
      status:"PENDING",
      message: "OTP sent successfully",
      data: {
        userId:_id,
        email,
      },
    });
  } catch (error) {
    res.json({
      status:"FAILED",
      message: "OTP could not be sent",
      error: error.message,
    });
  }
}

