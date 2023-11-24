const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ChatSchema = new mongoose.Schema(
  {

        _id: { type: ObjectId },  //Workflow ID
        ticketId: {                 //Ticket ID
        type: ObjectId,
        required: true,
        },
        Messages: {
            ClientMessages: Array,
            AgentMessages: Array,
            timestamp: Date,
            required: true,
            },
    });

module.exports = mongoose.model('Chat', ChatSchema);
