const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const WorkflowsSchema = new mongoose.Schema(
  {

        _id: { type: ObjectId },  //Workflow ID
        ticketId: {                 //Ticket ID
        type: ObjectId,
        required: true,
        },
        suggestions: []     //List of suggested solutions
    });

module.exports = mongoose.model('Workflows', WorkflowsSchema);
