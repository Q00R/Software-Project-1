const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

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
  status:{
    type:String,
    enum:["Deactivated","Activated"],
    required:true
  },
});

// Create the User model
module.exports = mongoose.model("User", userSchema);