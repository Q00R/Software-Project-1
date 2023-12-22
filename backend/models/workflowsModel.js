const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const WorkflowsSchema = new mongoose.Schema({
  Software: [
    {
      subIssue: {
        type: String,
        enum: [
          "Operating system",
          "Application software",
          "Custom software",
          "Integration issues",
        ],
        required: true,
      },
      commonIssues: [], //List of common issues
      suggestions: [], //List of suggested solutions
    },
  ],
  Hardware: [
    {
      subIssue: {
        type: String,
        enum: [
          "Desktops",
          "Laptops",
          "Printers",
          "Servers",
          "Netowrking equipment",
        ],
        required: true,
      },
      commonIssues: [], //List of common issues
      suggestions: [], //List of suggested solutions
    },
  ],
  Netwrok: [
    {
      subIssue: {
        type: String,
        enum: [
          "Email issues",
          "Internet Connection Problems",
          "Website Errors",
        ],
        required: true,
      },
      commonIssues: [], //List of common issues
      suggestions: [], //List of suggested solutions
    },
  ],
});

module.exports = mongoose.model("Workflows", WorkflowsSchema);
