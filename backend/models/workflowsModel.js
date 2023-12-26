const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const WorkflowsSchema = new mongoose.Schema({
  workflow: {
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
        "Networking Equipment",
        "Operating System",
        "Application Software",
        "Custom Software",
        "Integration Issues",
        "Email Issues",
        "Internet Connection Problems",
        "Website Errors",
      ],
      required: true,
    },
    commonIssues: [], //List of common issues
    suggestions: [], //List of suggested solutions
  },
});

module.exports = mongoose.model("Workflows", WorkflowsSchema);
