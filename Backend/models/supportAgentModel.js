const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const SupportAgentSchema = new mongoose.Schema(
  {
    user: {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      hashedPassword: {
        type: String,
        required: true,
      },
      salt: {
        type: String,
        required: true,
      },
      DOB: {
        type: Date,
        required: true,
      },
      address: {
        street: String,
        city: String,
        state: String,
        zip: String,
      },
      role: {
        type: String,
        enum: ["client", "manager", "admin"], // Can only be one of these
        default: "client", // Default role if not provided
      },
      name: {
        first_name: String,
        middle_name: String,
        last_name: String,
      },
      status: {
        type: String,
        enum: ["Deactivated", "Activated"],
        required: true
      },
    }, // Embedding the User schema
    rating: {
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
