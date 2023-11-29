const supportAgentModel = require("../models/supportAgentModel");
const userModel = require("../models/userModel");
const ticketModel = require("../models/ticketModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");

const agentController = {
    //respond to user ticket
    respondToTicket: async (req, res) => {
        try {
            const id = req.params.id;
            const response = req.body.response;
            const agentId = req.body.agentId;
            const ticket = await ticketModel.findById(id);
            if (ticket && ticket.assignedAgent == agentId) {
                //add in the array of the agent messages in the ticket
                ticket.Messages.AgentMessages.push({
                    message: response,
                  });
                await ticket.save();
                return res.status(200).json({ message: "Response added!" });
            } else {
                return res.status(400).json({ error: "Ticket not found!/Wrong Agent"});
            }
        } catch (e) {
            return res.status(400).json({ error: "Couldn't respond to ticket!" });
        }
    }
};

module.exports = agentController;