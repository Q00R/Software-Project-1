const userModel = require("../models/userModel.js"); // lookup what to do in this
const agentModel = require("../models/supportagentModel.js");
const bcrypt = require("bcrypt");
const userController = require("./userController.js");

const adminController = {
  createNewUser: async (req, res) => {
    try {
      const { username, email, password, DOB, name, address, role, mainRole } = req.body;
      // Check if the user already exists
      const user = userController.registerFunc(username, email, password, DOB, name, address, role);
      console.log(user);
      if (role === "agent") {
        const newAgent = new agentModel({
          user: user._id,
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
};

module.exports = adminController;
