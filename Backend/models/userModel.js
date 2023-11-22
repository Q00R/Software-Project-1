const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
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
  birthdate: {
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
    enum: ['normal', 'support agent', 'manager','admin'], // Can only be one of these
    default: 'normal', // Default role if not provided
  },
  hashedPassword:{
    type: String,
    required: true,
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
