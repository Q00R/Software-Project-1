const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ChatSchema = new mongoose.Schema(
  {

        _id: { type: ObjectId },  //Workflow ID
        ticketId: {                 //Ticket ID
        type: ObjectId,
        required: true,
        ref:"Ticket"
        },
        Messages: {
            ClientMessages: Array,
            AgentMessages: Array,
            timestamp: Date,

            required: true,
            },
            tickets:TicketsSchema
    });

module.exports = mongoose.model('Chat', ChatSchema);
