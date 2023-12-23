const chatModel = require("../models/chatModel");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const chatController = {
    createChat: async (req, res) => {
        try {
            const { ticketId, clientId, agentId } = req.body;
            const newChat = new chatModel({
                ticketId: new ObjectId(ticketId),
                clientId: new ObjectId(clientId),
                agentId: new ObjectId(agentId),
                messages: []
            })
            await newChat.save();
            return res.status(200).json(newChat);
        } catch(error) {
            return res.status(500).json({ message: error.message });
        }
    },
    addMessage: async (req, res) => {
        const { newMessage } = req.body;
        try {
            await chatModel.update(
                { _id: req.params.id },
                { $push: { messages: newMessage } }
            );
        }
        catch(error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getChat: async (req, res) => {
        try {
            const chat = await chatModel.findById(req.params.id);
            return res.status(200).json(chat);
        }
        catch(error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = chatController;