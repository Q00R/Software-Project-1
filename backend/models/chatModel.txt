const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const ChatSchema = new mongoose.Schema(
  {
    ticketId: {  // Ticket ID
      type: ObjectId,
      ref: "Ticket"
    },
    clientId: {
      type: ObjectId,
      ref: "User"
    },
    agentId: {
      type: ObjectId,
      ref: "Support_Agent"
    },
    messages: [{
      authorId: ObjectId,
      message: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
  });

module.exports = mongoose.model('Chat', ChatSchema);