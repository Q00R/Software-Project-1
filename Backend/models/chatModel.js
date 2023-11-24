const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ChatSchema = new mongoose.Schema(
  {

        _id: { type: ObjectId },  // Chat ID
        ticketId: {                 // Ticket ID
        type: ObjectId,
        ref:"Ticket"
        },
        Messages: {
            ClientMessages: [
              {
                message: {
                    type: String,
                    required: true,
                },
                timestamp: {
                    type: Date,
                    default: Date.now,
                    required: true,
                }
            }],
            AgentMessages: [
              {
                message: {
                    type: String,
                    required: true,
                },
                timestamp: {
                    type: Date,
                    default: Date.now,
                    required: true,
                }
          }],
            required: true,
        },
    });

module.exports = mongoose.model('Chat', ChatSchema);
