const Conversation = require("../models/Conversation");


const conversationsController = {
  
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
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
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
