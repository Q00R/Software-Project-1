const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const categories = {
  Software: [
      "Operating system",
      "Application software",
      "Custom software",
      "Integration issues"
  ],
  Hardware: [
      "Desktops",
      "Laptops",
      "Printers",
      "Servers",
      "Networking equipment"
  ],
  Network: [
      "Email issues",
      "Internet connection problems",
      "Website errors"
  ]
};

const FAQSchema = new mongoose.Schema({
  mainIssue: {
    type: String,
    enum: Object.keys(categories),
    required: true,
  },
  subIssue: {
    type: String,
    enum: Object.values(categories).flat(),
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