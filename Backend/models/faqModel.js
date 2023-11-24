const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const FAQSchema = new mongoose.Schema({
  _id: { type: ObjectId }, //FAQ ID
  mainIssue: {
    type: String,
    enum: ["Software", "Hardware", "Network"],
    required: true,
  },
  subIssue: {
    type: String,
    enum: [
      "Desktops",
      "Laptops",
      "Printers",
      "Servers",
      "Networking equipment",
      "Operating system",
      "Application software",
      "Custom software",
      "Integration issues",
      "Email issues",
      "Internet connection problems",
      "Website errors",
    ],
    required: true,
  },
  question:{
  type:String,
  required:true
  },
  title:{
  type:String,
  required:true
  },
  solution: {
    type: String,
    required: true,
  },
  timestamps:{
    type:Date,
    default:Date.now,
    required: true,
  } 
});

module.exports = mongoose.model("FAQ", FAQSchema);
