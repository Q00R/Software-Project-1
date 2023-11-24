const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ChatSchema = new mongoose.Schema(
  {

        _id: {  // Chat ID
        type: ObjectId ,
        required:true
        },  
        ticketId: {  // Ticket ID
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
        },
    });

module.exports = mongoose.model('Chat', ChatSchema);
