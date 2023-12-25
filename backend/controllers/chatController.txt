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
                roomNum: Math.floor(Math.random() * Number.MAX_VALUE) + 1,
                messages: []
            })
            await newChat.save();
            return res.status(200).json(newChat);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    addMessage: async (req, res) => {
        try {
            const updatedChat = await chatModel.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { messages: req.body } },
                { new: true }
            );
            return res.status(200).json(updatedChat);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getChat: async (req, res) => {
        try {
            const chat = await chatModel.findById(req.params.id);
            return res.status(200).json(chat);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getAllChatsForClient: async (req, res) => {
        try {
            const chat = await chatModel.find({
                clientId: req.params.id
            }).sort({ _id: -1 });
            res.status(200).json(chat);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getAllChatsForAgent: async (req, res) => {
        try {
            const chat = await chatModel.find({
                agentId: req.params.id
            }).sort({ _id: -1 });
            res.status(200).json(chat);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = chatController;