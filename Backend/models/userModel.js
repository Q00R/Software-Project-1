const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  _id: { type: ObjectId, required: true }, //User ID

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
    enum: ["normal", "manager", "admin"], // Can only be one of these
    default: "normal", // Default role if not provided
  },
  name: {
    first_name: String,
    middle_name: String,
    last_name: String,
  },
  status:{
    enum:["Deactivated","Activated"]
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
