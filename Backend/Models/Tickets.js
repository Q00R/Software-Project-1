const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const TicketsSchema = new mongoose.Schema(
  {
    _id: { type: ObjectId },
    userId: {
        type: ObjectId,
        required: true,
        },
        issueDate: {
        type: Date,
        required: true,
        },
        expirationDate: {
        type: Date,
        required: false,
        },
        title: {
        type: String,
        required: true,
        },
        description: {
        type: String,
        required: true,
        },
        status: { //open closed pending
        type: String,
        required: true,
        },
        category: {
        type: String,
        required: true,
        },
        priority: {
        type: String,
        required: true,
        },
        assignedAgent: {
            type: ObjectId, // sanara
            required: false, //ask about this
        },
        updates: {
            type: {
              flag: {
                type: boolean,
                required: true,
              },
              description: {
                type: String,
                required: false,
              },
        },
        required: false,
    },

    // CustomWorkflowToBeDone DataVis > CustomWorkflowToBeDone

  }
);


module.exports = mongoose.model('Tickets', TicketsSchema);
