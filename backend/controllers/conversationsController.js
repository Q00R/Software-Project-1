const Conversation = require("../models/Conversation");
const supportAgentModel = require("../models/supportagentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const conversationsController = {
  getAgentByIssue: async (req, res) => {
    console.log("ana henaaa");
    const { mainIssue } = req.params;
    try {
      const agent = await supportAgentModel.findOne({
        main_role: mainIssue,
      });
      res.status(200).json(agent._id);
    } catch (error) {
      res.status(400).json({ error: "Error 400: Support agent not found" });
    }
  },

  // new conv
  createConversation: async (req, res) => {
    const decode = jwt.verify(
      req.headers.cookie.split("token=")[1],
      process.env.SECRET_KEY
    );
    const { userId } = decode.user;
    const newConversation = new Conversation({
      members: [userId, req.body.receiverId],
    });

    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get conv of a user
  getConversation: async (req, res) => {
    const decode = jwt.verify(
      req.headers.cookie.split("token=")[1],
      process.env.SECRET_KEY
    );
    const { userId } = decode.user;
    try {
      const conversation = await Conversation.find({
        members: { $in: userId },
      });
      console.log(conversation);
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  } /*,
  // get conv includes two userId
  getConversationTwoUsers: async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  }*/,
};

module.exports = conversationsController;
