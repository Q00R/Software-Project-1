const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const WorkflowsSchema = new mongoose.Schema({
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
      "Other"
    ],
    required: true,
  },
  suggestions: [], //List of suggested solutions
});

module.exports = mongoose.model("Workflows", WorkflowsSchema);