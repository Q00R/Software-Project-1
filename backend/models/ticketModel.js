const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;


const TicketsSchema = new mongoose.Schema({
  userId: { // The user that created the ticket
    type: ObjectId,
    ref: "User",
    required: true,
  },
  assignedAgent: {
    //The agent that will be assigned to the ticket
    type: ObjectId,
    ref: "Support_Agent",
    required: false, //DONIA
  },
  creationDate: {
    //Date of creation
    type: Date,
    required: true,
    default: Date.now,
  },
  title: {
    //Title of the ticket
    type: String,
    required: true,
  },
  description: {
    //Description of the ticket
    type: String,
    required: true,
  },
  ticketStatus: { //
    //Opened, In Progress, Closed, 
    type: String,
    enum: ["Opened", "In Progress", "Closed"],
    default: "Opened",
    required: true,
  },
  mainIssue: {
    //The main category of the issue
    type: String,
    enum: ["Software", "Hardware", "Network"],
    required: true,
  },
  subIssue: {
    //The sub category of the issue
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

  answer: { // This is the actually summary of the ticket created by the agent upon resolution
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  resolutionDate: { // The timestamp of when the ticket was resolved
      type: Date,
      default: Date.now,
      required: false,
    },

  rating: {
    //The rating of the agent by the user
    type: Number,
    min: 0,
    max: 5,
    default: -1,
  },
  Messages: {
    AgentMessages: [
      {
        message: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        }
      }],
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true,
  },
});

module.exports = mongoose.model("Ticket", TicketsSchema);