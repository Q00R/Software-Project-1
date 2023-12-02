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
            const userId = req.body.userId;
            if(!id || !response){
                return res.status(400).json({ error: "Missing required fields!" });
            }

            const ticket = await ticketModel.findById(id);
            
           
            if (!ticket) {
                return res.status(400).json({ error: "Ticket not found!" });
              }

              if(ticket.userId != userId){
                return res.status(400).json({ error: "Wrong User!" });
            }
        
              if (ticket.status === "Closed") {
                return res.status(400).json({ error: "Ticket is closed! If you are not satisfied, you can request a live chat by pressing on the below button." });
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