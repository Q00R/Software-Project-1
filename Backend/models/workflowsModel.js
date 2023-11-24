const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const WorkflowsSchema = new mongoose.Schema({
  _id: { type: ObjectId }, //Workflow ID
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
  suggestions: [], //List of suggested solutions
});

module.exports = mongoose.model("Workflows", WorkflowsSchema);
