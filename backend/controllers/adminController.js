const userModel = require("../models/userModel.js"); // lookup what to do in this
const agentModel = require("../models/supportagentModel.js");
const bcrypt = require("bcrypt");
const userController = require("./userController.js");
const themeModel = require("../models/ThemesModel.js");

const adminController = {
  createNewUser: async (req, res) => {
    try {
      const { username, email, password, DOB, name, address, role, mainRole } = req.body;
      if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters long", error: "Password must be at least 8 characters long" });
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
              return res.status(400).json({
                status: "FAILED",
                message: "OTP could not be created",
                error: err.message,
              });
            });
          // return with successful status code
          console.log("result" + result);
        })
        .catch(err => {
          console.log(err);
          return res.status(400).json({
            status: "FAILED",
            message: "User could not be created",
            error: err.message,
          });
        });
      
      console.log(newUser);
      if (role === "agent") {
        const newAgent = new agentModel({
          user: newUser._id,
          main_role: mainRole
        });
        await newAgent.save();
      }
      return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "User could not be created",
        error: error.message,
      });
    }
  },
  adminChangeRole: async (req, res) => {
    try {
      const { userId, newRole } = req.body;
      if (userModel.schema.path("role").enumValues.includes(newRole)) {
        const user = await userModel.findByIdAndUpdate(userId, {
          role: newRole,
        });
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ error: "Role does not exist!" });
      }
    } catch (e) {
      return res.status(400).json({ error: "Couldnt change role! " + e });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.find();
      for (let i = 0; i < users.length; i++) {
        users[i].hashedPassword = undefined;
        users[i].salt = undefined;
      }
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },
  getAllThemes: async (req, res) => {
    try {
      const themes = await themeModel.find();
      return res.status(200).json(themes);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },
  createTheme: async (req, res) => {
    try {
      const { name } = req.body;
      const newTheme = new themeModel({ themeName: name });
      await newTheme.save();
      return res.status(200).json({ message: "Theme created successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },
  updateTheme: async (req, res) => {
    try {
      const { _id, active } = req.body;
      const theme = await themeModel.findByIdAndUpdate(_id, { active });
      return res.status(200).json({ message: "Theme updated successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },
  deleteTheme: async (req, res) => {
    try {
      const theme = await themeModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Theme deleted successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },
};

module.exports = adminController;
