const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey =process.env.SECRET_KEY ;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const userController = {
  register: async (req, res) => {
    const { username ,email, password, role, DOB, name, address } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash and salt the password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user with the hashed password
      const newUser = new User({ username, email, hashedPassword, salt, role, DOB, name, address });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  initiateLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }

      const salt = await user.salt;
      const hashedPassword = await bcrypt.hash(password, salt);
      // Verify password
      if (hashedPassword !== user.hashedPassword) {
        return res.status(405).json({ message: "Incorrect password" });
      }

      // Generate TOTP code
      const totpCode = user.generateTOTPCode();

      // Send TOTP code to the user's email
      await sendTOTPCodeByEmail(user.email, totpCode);

      res.status(200).json({ message: "Initiated login. TOTP code sent to the user's email." });
    } catch (error) {
      console.error("Error initiating login:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  completeLogin: async (req, res) => {
    try {
      const { email, totpCode } = req.body;

      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }

      // Verify TOTP code
      const isTOTPVerified = user.verifyTOTP(totpCode);
      if (!isTOTPVerified) {
        return res.status(406).json({ message: "Incorrect TOTP code" });
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

      let newSession = new sessionModel({
        userId: user._id,
        token,
        expiresAt: expiresAt,
      });

      await newSession.save();

      res
        .cookie("token", token, {
          expires: expiresAt,
          withCredentials: true,
          httpOnly: false,
          SameSite: 'none',
        })
        .status(200)
        .json({ message: "Login successful. TOTP code verified.", user });
    } catch (error) {
      console.error("Error completing login:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
module.exports = userController;


// Function to send TOTP code to the user's email
async function sendTOTPCodeByEmail(userEmail, totpCode) {
  // Replace with your email configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // Use the App Password here
    },
    secure: true, // Enable TLS (if not already set by default)
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: userEmail,
    subject: "Your TOTP Code",
    text: `Your TOTP code is: ${totpCode}`,
  };

  await transporter.sendMail(mailOptions);
}
