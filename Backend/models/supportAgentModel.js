const { array } = require('joi');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const SupportAgentSchema = new mongoose.Schema(
  {

        _id: { type: ObjectId },  //Ticket ID
        userId: {
            type: ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
          },
        rating:{
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
        active_tickets: {
            type: Array,
            required: true,
        },
        resolved_tickets: {
            type: Array,
            required: true,
        },
        main_role: {          
            type: String,
            enum: ['Software', 'Hardware', 'Network'],
            required: true,
          },
          user: UserSchema, // Embedding the User schema
  }
);


module.exports = mongoose.model('Support_Agent', SupportAgentSchema);
