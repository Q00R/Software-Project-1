const messageModel = require("../models/Message");
const conversationModel = require("../models/Conversation");

const messagesController = {
  //add a message
  addMessage: async (req, res) => {
    const newMessage = new messageModel(req.body);

    await conversationModel.findByIdAndUpdate({ _id: newMessage.conversationId }, { updatedAt: Date.now() });
    try {
      const savedMessage = await newMessage.save();

      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get messages for a convo
  getMessages: async (req, res) => {
    try {
      const messages = await messageModel.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = messagesController;
