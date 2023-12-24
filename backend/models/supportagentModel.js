const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const SupportAgentSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User", // Reference to the User model
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: -1,
  },
  active_tickets: {
    Software: [{ type: ObjectId, ref: "Ticket" }],
    Hardware: [{ type: ObjectId, ref: "Ticket" }],
    Network: [{ type: ObjectId, ref: "Ticket" }],
  },
  resolved_tickets: [
    {
      type: ObjectId,
      ref: "Ticket", // Reference to the Ticket model
    },
  ],
  main_role: {
    type: String,
    enum: ["Software", "Hardware", "Network"],
    required: true,
  },
});

module.exports = mongoose.model("Support_Agent", SupportAgentSchema);
