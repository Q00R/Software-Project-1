const { array } = require('joi');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const SupportAgentSchema = new mongoose.Schema(
  {

        _id: { type: ObjectId }, //Support Agent ID
        user: UserSchema, // Embedding the User schema
        rating:{
            type: Number,
            min: 0,
            max: 5,
        },
        active_tickets: [{
            type: ObjectId,
            ref: 'Ticket', // Reference to the Ticket model
        }],
        resolved_tickets: [{
          type: ObjectId,
          ref: 'Ticket', // Reference to the Ticket model
      }],
        main_role: {          
            type: String,
            enum: ['Software', 'Hardware', 'Network'],
            required: true,
          },
  }
);


module.exports = mongoose.model('Support_Agent', SupportAgentSchema);
