const supportAgentModel = require("../models/supportagentModel");
const userModel = require("../models/userModel");
const ticketModel = require("../models/ticketModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const agentController = {
  viewMyActiveTickets: async (req, res) => {
    try {
      const userID = req.params.id;
      const myTicket = await ticketModel.findById(id);

      if (myTicket.assignedAgent !== userID) {
        return res.status(400).json({ error: "Error 400: Ticket was not assigned for you!" });
      }
      if (!myTicket) {
        return res.status(400).json({ error: "Error 400: Unavailable ticket" });
      }
      if (myTicket.status === "Closed") {
        return res.status(400).json({ error: "Error 400: Ticket is not active!" });
      }
      else {
        return res.status(200).json({ message: "Active tickets", myTicket });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error 500: Something is wrong, please try again!" });
    }
  },

  viewMyResolvedTickets: async (req, res) => {
    try {
      const userID = req.params.id;
      const myTicket = await ticketModel.findById(id);

      if (myTicket.assignedAgent !== userID) {
        return res.status(400).json({ error: "Error 400: Ticket was not assigned for you!" });
      }
      if (!myTicket) {
        return res.status(400).json({ error: "Error 400: Unavailable ticket" });
      }
      if (myTicket.status === "Open") {
        return res.status(400).json({ error: "Error 400: Ticket is still active!" });
      }
      else {
        return res.status(200).json({ message: "Resolved tickets", myTicket });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error 500: Something is wrong, please try again!" });
    }
  },

  resolveTicket: async (req, res) => {
    try {
      const userID = req.params.id;
      const myTicket = await ticketModel.findById(id);

      if (myTicket.assignedAgent !== userID) {
        return res.status(400).json({ error: "Error 400: Ticket was not assigned for you!" });
      }
      if (!myTicket) {
        return res.status(400).json({ error: "Error 400: Unavailable ticket" });
      }
      if (myTicket.status === "Closed") {
        return res.status(400).json({ error: "Error 400: Ticket has been already resolved!" });
      }
      else {
        myTicket.status = "Closed";
        myTicket.resolutionDate = Date.now();
        myTicket.answer.title = req.body.title;
        myTicket.answer.description = req.body.description;
        await myTicket.save();
        return res.status(200).json({ message: "Ticket is updated into resolved!" });
      }
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error 500: Something is wrong, please try again!" });
    }
  },
  //respond to user ticket
  respondToTicket: async (req, res) => {
    try {
      console.log("Controller: " + req.user);
      const id = req.params.ticketId;
      const agentUserId = req.user.userId;
      const response = req.body.response;
      const ticketStatus = req.body.ticketStatus;
      const agent = await supportAgentModel.findOne({ user: agentUserId});
      console.log("agent "+agent);

      console.log("Ticket" + id);
      if (!id || !response) {
        return res.status(400).json({ error: "Missing required fields!" });
      }
      const ticket = await ticketModel.findById(id);
      console.log(ticket);
      if (!ticket) {
        return res.status(400).json({ error: "Ticket not found!" });
      }

      // const ticketType = ticket.mainIssue;

      if (ticket.ticketStatus === "Closed") {
        return res.status(400).json({ error: "Ticket is closed!" });
      }

      console.log(ticket.assignedAgent);

      if (!agent) {
        return res.status(400).json({ error: "Agent not found!" });
      }

      const agentTickets = agent.active_tickets["Software"] + agent.active_tickets["Hardware"] + agent.active_tickets["Network"];
      console.log(agentTickets.includes(id));

      if (agentTickets.includes(id)) {
        response
      } else {
        return res.status(400).json({ error: "Wrong Agent!" });
      }

      // Add the agent message to the ticket
      ticket.response = response;
      await ticket.save();

      if (ticketStatus === "Closed") {

        if (agent) {

          // // Find the index of the ticket in the active_tickets array
          // const index = Object.values(agent.active_tickets).flat().indexOf(id);

          // // If the ticket is found, remove it from the array
          // if (index !== -1) {
          //   const activeTickets = Object.keys(agent.active_tickets);
          //   const role = activeTickets.find(role => agent.active_tickets[role].includes(id));
          //   agent.active_tickets[role].splice(index, 1);
          // }

          //print the active tickets

          // remove the ticket from the active tickets array
          const activeTickets = Object.keys(agent.active_tickets);
          const role = activeTickets.find(role => agent.active_tickets[role].includes(id));
          agent.active_tickets[role].pull(id);
          agent.resolved_tickets.push(id);
          await agent.save();
        }

        ticket.ticketStatus = "Closed";
        ticket.resolutionDate = Date.now();
        await ticket.save();
      }

        else{
      ticket.ticketStatus = "In Progress";
      await ticket.save();
        }
      // Send email to the user from the agent's email
      if (agent) {
        const transporter = nodemailer.createTransport({ // as if we are logging in by gmail
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        const user = await userModel.findById(ticket.userId);
        if (user) {
          let emailText = `Dear ${user.username},\n\nYour support ticket has been updated. Here is the latest response:\n\n${response}`
          if (ticketStatus === "Closed") {
            emailText += `\n\nThe ticket has been closed. If you are not satisfied, you can request a live chat by visiting our website and requesting a live chat on the my tickets page.`
          }
          else {
            emailText += `\n\nThe ticket is still in progress, we will send you another response soon!`
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