const chatModel = require("../models/chatModel");

const chatController = {
    createChat: async (req, res) => {
        try {
            const { ticketId, clientId, agentId } = req.body;
            const newChat = new chatModel({
                ticketId: ticketId,
                clientId: clientId,
                agentId: agentId,
                messages: []
            })
            await newChat.save();
            return res.status(200).json(newChat);
        } catch {
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
        catch {
            return res.status(500).json({ message: error.message });
        }
    },
    getChat: async (req, res) => {
        try {
            const chat = await chatModel.findById(req.params.id);
            return res.status(200).json(chat);
        }
        catch {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = chatController;