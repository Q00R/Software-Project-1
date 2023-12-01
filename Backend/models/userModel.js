const { boolean } = require("joi");
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const speakeasy = require("speakeasy");


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
    enum:["Deactivated","Activated"]
  },
  MFAEnabled:{
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  }
});

userSchema.methods.enableTOTP = function () {
  this.totpSecret = speakeasy.generateSecret({ length: 20 }).base32;
};

userSchema.methods.generateTOTPCode = function () {
  this.enableTOTP();
  this.totpExpiresAt = new Date(Date.now() + 30 * 1000); // Set expiration time for TOTP (e.g., 30 seconds)
  return speakeasy.totp({
    secret: this.totpSecret,
    encoding: "base32",
  });
};

userSchema.methods.verifyTOTP = function (token) {
  return (
    this.totpSecret &&
    this.totpExpiresAt &&
    this.totpExpiresAt > new Date() &&
    speakeasy.totp.verify({
      secret: this.totpSecret,
      encoding: "base32",
      token: token,
    })
  );
};




// Create the User model
module.exports = mongoose.model("User", userSchema);