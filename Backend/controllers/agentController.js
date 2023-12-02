const supportAgentModel = require("../Models/supportAgentModel");
const userModel = require("../models/userModel");
const ticketModel = require("../models/ticketModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const agentController = {
    //respond to user ticket
    respondToTicket: async (req, res) => {
        try {
            const id = req.params.ticketId;
            const agentId = req.body.agentId; //for now we will use the agentId from the body
            const response = req.body.response;
            const ticketStatus = req.body.ticketStatus;

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

              console.log(ticket.assignedAgent);
                console.log(agentId);
        
              if (ticket.assignedAgent != agentId) {
                return res.status(400).json({ error: "Wrong Agent!" });
              }
        
              if (ticketStatus === "Closed") {
                ticket.status = "Closed";
                ticket.resolutionDate = Date.now();
                await ticket.save();
        
                const agent = await supportAgentModel.findById(agentId);
                if (agent) {
                  agent.active_tickets.pull(id);
                  agent.resolved_tickets.push(id);
                  await agent.save();
                }
              }
        
              // Add the agent message to the ticket
              ticket.Messages.AgentMessages.push({
                message: response,
              });
              await ticket.save();
        
              // Send email to the user from the agent's email
              const agent = await supportAgentModel.findById(agentId);
              if (agent) {
                const transporter = nodemailer.createTransport({ // as if we are logging in by gmail
                  service: "gmail",
                  auth: {
                    user: "DarwinsAgents@gmail.com",
                    pass: "mombjfhrqmlofkdj",
                  },
                });
        
                const user = await userModel.findById(ticket.userId);
                if (user) {
                  let emailText = `Dear ${user.username},\n\nYour support ticket has been updated. Here is the latest response:\n\n${response}`
                  if (ticketStatus === "Closed") {
                    emailText += `\n\nThe ticket has been closed. If you are not satisfied, you can request a live chat by visiting our website and requesting a live chat on the my tickets page.`
                  }
                  else{
                    emailText += `\n\nYou can respond to this ticket by visiting our website and responding on the my tickets page.`
                  }
                  const mailOptions = {  // the content of the email that will be sent to the user
                    from: "DarwinsAgents@gmail.com",
                    to: user.email,
                    subject: "Response to Your Ticket",
                    text: emailText,
                  };
        
                  transporter.sendMail(mailOptions, (error, info) => { // send the email
                    if (error) {
                      console.error(error);
                    } else {
                      console.log("Email sent: " + info.response);
                    }
                  });
        
                  return res.status(200).json({ message: "Response added!" });
                } else {
                  return res.status(400).json({ error: "User not found!" });
                }
              } else {
                return res.status(400).json({ error: "Agent not found!" });
              }
            } catch (e) {
              console.error(e);
              return res.status(500).json({ error: "An Error has Occured" });
            }
          },
        };

module.exports = agentController;