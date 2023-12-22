const userModel = require("../models/userModel.js"); // lookup what to do in this
const agentModel = require("../models/supportagentModel.js");
const bcrypt = require("bcrypt");

const adminController = {
  createNewUser: async (req, res) => {
    const {username, email, password, DOB, name, address, mainRole} = req.body;
    try {
      // Check if the user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      // Hash and salt the password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Create a new user with the hashed password
      const newUser = new userModel({
        username,
        email,
        hashedPassword,
        salt,
        role : "agent",
        DOB,
        name,
        address,
        verifiedEmail: false,
      });
      await newUser.save().then(result => 
        {
          res.status(200);
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
      const newAgent = new agentModel({
        user: newUser,
        main_role: mainRole
      });
      await newAgent.save().then(result => 
        {
          res.status(200);
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
      if (userModel.schema.path("role").enumValues.include(newRole)) {
        const user = await userModel.findByIdAndUpdate(userId, {
          role: newRole,
        });
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ error: "Role does not exist!" });
      }
    } catch (e) {
      return res.status(400).json({ error: "Couldnt change role!" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.find();
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },
};

module.exports = adminController;
