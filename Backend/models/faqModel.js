const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const FAQSchema = new mongoose.Schema({
  _id: { type: ObjectId }, //FAQ ID
  issue: {
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
  },
  solution: {
    type: String,
    required: true,
  },
  timestamps: true,
});
module.exports = mongoose.model("FAQ", FAQSchema);
