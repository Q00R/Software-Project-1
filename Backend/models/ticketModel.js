const mongoose = require("mongoose");
<<<<<<< HEAD
const ObjectId = mongoose.Schema.Types.ObjectId;


const TicketsSchema = new mongoose.Schema({
  _id: { type: ObjectId,
  required: true,
  }, //Ticket ID
=======
const { ObjectId } = mongoose.Types;


const TicketsSchema = new mongoose.Schema({
>>>>>>> ba63d9228bbc434c83351653ffdfa2dfd44e2172
  userId: { // The user that created the ticket
    type: ObjectId,
    ref: "User",
    required: true,
  },
  assignedAgent: {
    //The agent that will be assigned to the ticket
    type: ObjectId,
    ref: "Support_Agent",
<<<<<<< HEAD
=======
    required: true,
>>>>>>> ba63d9228bbc434c83351653ffdfa2dfd44e2172
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
  status: {
<<<<<<< HEAD
    //Opened, Closed, 
    type: String,
    default: "Opened",
    enum: ["Opened", "Closed"],
=======
    //Opened, In Progress, Closed, 
    type: String,
    default: "Opened",
    enum: ["Opened", "In Progress", "Closed"],
>>>>>>> ba63d9228bbc434c83351653ffdfa2dfd44e2172
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
<<<<<<< HEAD
      required: true,
=======
      required: false,
>>>>>>> ba63d9228bbc434c83351653ffdfa2dfd44e2172
    },
  },
  resolutionDate: { // The timestamp of when the ticket was resolved
      type: Date,
      default: Date.now,
<<<<<<< HEAD
      required: true,
=======
      required: false,
>>>>>>> ba63d9228bbc434c83351653ffdfa2dfd44e2172
    },

  rating: {
    //The rating of the agent by the user
    type: Number,
    min: 0,
    max: 5,
<<<<<<< HEAD
    required: false,
=======
    default: 0,
>>>>>>> ba63d9228bbc434c83351653ffdfa2dfd44e2172
  },
  Messages: {
    ClientMessages: [
      {
        message: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
          required: true,
        }
      }],
    AgentMessages: [
      {
        message: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
<<<<<<< HEAD
          required: true,
=======
>>>>>>> ba63d9228bbc434c83351653ffdfa2dfd44e2172
        }
      }],
  },
});

module.exports = mongoose.model("Ticket", TicketsSchema);
