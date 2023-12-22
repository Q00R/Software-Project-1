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
    enum: ["client", "manager", "admin","agent"], // Can only be one of these
    default: "client", // Default role if not provided
  },
  name: {
    type: String,
    required: true,
  },
  status:{
    type:String,
    enum:["Deactivated","Activated"],
    default:"Activated",
    required:true
  },
  MFAEnabled:{
    type: Boolean,
    default: false,
  },
  verifiedEmail: {
    type: Boolean,
    default: false,
  },
  // if MFA is enabled, did the user verify their OTP?
  canPass:{
    type: Boolean,
    default: true
  },
  
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