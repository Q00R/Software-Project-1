const conversationModel = require("../models/Conversation");
const supportAgentModel = require("../models/supportagentModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const conversationsController = {
  getAgentByIssue: async (req, res) => {
    const { mainIssue } = req.params;
    try {
      const agent = await supportAgentModel.findOne({
        main_role: mainIssue,
      });
      res.status(200).json(agent.user);
    } catch (error) {
      res.status(400).json({ error: "Error 400: Support agent not found" });
    }
  },
  getUsername: async (req, res) => {
    try {
      res.status(200).json((await userModel.findById({ _id: req.params.id })).username);
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
    const newConversation = new conversationModel({
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
      const conversation = await conversationModel.find({
        members: { $in: userId },
      }).sort({ updatedAt: -1 });
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
