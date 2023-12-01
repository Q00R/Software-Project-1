const supportAgentModel = require("../Models/supportAgentModel");
const userModel = require("../models/userModel");
const ticketModel = require("../models/ticketModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const userController = {
    //respond to user ticket
    respondToAgentTicket: async (req, res) => {
        try {
            const id = req.params.ticketId;
            const response = req.body.response;
            if(!id || !response){
                return res.status(400).json({ error: "Missing required fields!" });
            }

            const ticket = await ticketModel.findById(id);
            console.log(ticket);
            if (!ticket) {
                return res.status(400).json({ error: "Ticket not found!" });
              }
        
              if (ticket.status === "Closed") {
                return res.status(400).json({ error: "Ticket is closed!" });
              }
              ticket.Messages.ClientMessages.push({
                message: response,
              });
              await ticket.save();
              return res.status(200).json({ message: "Response Sent Successfully!" });
            } catch (e) {
              console.error(e);
              return res.status(500).json({ error: "An Error has Occured" });
            }
          },
        };

module.exports = userController;