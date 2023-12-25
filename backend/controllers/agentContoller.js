const supportAgentModel = require("../models/supportagentModel");
//const supportagentModel = require("../models/supportagentModel");
const userModel = require("../models/userModel");
const ticketModel = require("../models/ticketModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { ObjectId } = require("mongodb");

const agentController = {
  viewAllTickets: async (req, res) => {
    try {
      const decode = jwt.verify(
        req.headers.cookie.split("token=")[1],
        process.env.SECRET_KEY
      );
      const { userId } = decode.user;

      const userIdObject = new ObjectId(userId);
      const supportAgent = await supportAgentModel.findOne({ user: userIdObject });

      if (!supportAgent) {
        return res.status(400).json({ error: "Error 400: Support agent not found" });
      }

      let allTickets = [];

      Object.keys(supportAgent.active_tickets).forEach(ticketType => {
        allTickets = allTickets.concat(supportAgent.active_tickets[ticketType]);
      });

      Object.keys(supportAgent.resolved_tickets).forEach(ticketType => {
        allTickets = allTickets.concat(supportAgent.resolved_tickets[ticketType]);
      });

      if (allTickets.length === 0) {
        return res.status(400).json({ error: "Error 400: No tickets available" });
      }
      else {
        const allTicketsDetails = await ticketModel.find({ _id: { $in: allTickets } });
        return res.status(200).json({ message: "All tickets", allTickets: allTicketsDetails });
      }

      // return res.status(200).json({ message: "All tickets", allTickets });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error 500: Something went wrong, please try again!" });
    }
  }

  ,

  viewMyActiveTickets: async (req, res) => {
    const decode = jwt.verify(
      req.headers.cookie.split("token=")[1],
      process.env.SECRET_KEY
    );
    const { userId } = decode.user;

    try {
      const userIdObject = new ObjectId(userId);
      const supportAgent = await supportAgentModel.findOne({ user: userIdObject });

      if (!supportAgent) {
        return res.status(400).json({ error: "Error 400: Support agent not found" });
      }

      let allActiveTickets = [];

      Object.keys(supportAgent.active_tickets).forEach(ticketType => {
        allActiveTickets = allActiveTickets.concat(supportAgent.active_tickets[ticketType]);
      });

      if (allActiveTickets.length === 0) {
        return res.status(400).json({ error: "Error 400: No active tickets" });
      } else {
        const activeTicketsDetails = await ticketModel.find({ _id: { $in: allActiveTickets }, ticketStatus: 'In Progress' });
        return res.status(200).json({ message: "Active tickets", activeTickets: activeTicketsDetails });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error 500: Something is wrong, please try again!" });
    }
  }
  ,

  viewMyResolvedTickets: async (req, res) => {
    const decode = jwt.verify(
      req.headers.cookie.split("token=")[1],
      process.env.SECRET_KEY
    );
    const { userId } = decode.user;

    try {
      const userIdObject = new ObjectId(userId);
      const supportAgent = await supportAgentModel.findOne({ user: userIdObject });

      if (!supportAgent) {
        return res.status(400).json({ error: "Error 400: Support agent not found" });
      }

      let allResolvedTickets = [];

      Object.keys(supportAgent.resolved_tickets).forEach(ticketType => {
        allResolvedTickets = allResolvedTickets.concat(supportAgent.resolved_tickets[ticketType]);
      });

      if (allResolvedTickets.length === 0) {
        return res.status(400).json({ error: "Error 400: No resolved tickets" });
      } else {
        const resolvedTicketsDetails = await ticketModel.find({ _id: { $in: allResolvedTickets }, ticketStatus: 'Closed' });
        return res.status(200).json({ message: "Resolved tickets", resolvedTickets: resolvedTicketsDetails });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error 500: Something is wrong, please try again!" });
    }
  },

  resolveTicket: async (req, res) => {
    const decode = jwt.verify(
      req.headers.cookie.split("token=")[1],
      process.env.SECRET_KEY
    );

    const { userId } = decode.user;
    const { ticketId } = req.params;

    try {
      const myTicket = await ticketModel.findOne({ _id: ticketId });

      if (!myTicket) {
        return res.status(400).json({ error: "Error 400: Unavailable ticket" });
      }
      if (myTicket.ticketStatus === "Closed") {
        return res.status(400).json({ error: "Error 400: Ticket has been already resolved!" });
      }

      myTicket.ticketStatus = "Closed";
      myTicket.resolutionDate = Date.now();
      myTicket.response = req.body.response;
      await myTicket.save();

      const supportAgent = await supportAgentModel.findOne({ user: userId });

      if (!supportAgent) {
        return res.status(400).json({ error: "Error 400: Support agent not found" });
      }

      // Remove the ticket from active_tickets array
      let ticketRemoved = false;
      const ticketTypes = ['Software', 'Hardware', 'Network'];
      for (const ticketType of ticketTypes) {
        const index = supportAgent.active_tickets[ticketType].indexOf(ticketId);
        if (index !== -1) {
          supportAgent.active_tickets[ticketType].splice(index, 1);
          ticketRemoved = true;
          break;
        }
      }
      if (!ticketRemoved) {
        return res.status(400).json({ error: "Error 400: Ticket not found in active tickets" });
      }

      // Add the ticket ID to resolved_tickets array
      supportAgent.resolved_tickets.push(ticketId);
      await supportAgent.save();

      return res.status(200).json({ message: "Ticket is updated into resolved!" });

    } catch (err) {
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
      const agent = await supportAgentModel.findOne({ user: agentUserId });
      console.log("agent " + agent);

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

      else {
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