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
  age: {
    type: Number,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default value if not provided
  },
  password: {
    type: String,
    required: true,
    trim: true,           // removes whitespace from both ends of a string
  },
  role: {
    type: String,
    enum: ['user', 'support agent', 'manager'],
    default: 'normal', // Default role if not provided
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
