const User = require("../models/userModel");
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
  register: async (req, res) => 
  {
    const { username ,email, password, role, DOB, name, address } = req.body;

    try 
    {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) 
      {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash and salt the password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user with the hashed password
      const newUser = new User({ username, email, hashedPassword, salt, role, DOB, name, address, verified: false });
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
      await User.findByIdAndUpdate(userId, { verified: true });
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

