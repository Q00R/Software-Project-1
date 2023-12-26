const ticketModel = require("../models/ticketModel");
const supportAgentModel = require("../models/supportagentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const UserOTPVerification = require("../models/userOTPVerificationModel");
const QRCode = require("qrcode");
const speakeasy = require("speakeasy");

const {
  Queue,
  HighPriority,
  MediumPriority,
  LowPriority,
} = require("../Queue");
const { ObjectId } = require("mongodb");
const workflowsModel = require("../models/workflowsModel");

function isFree(agent) {
  return (
    agent.active_tickets.Software.length +
    agent.active_tickets.Hardware.length +
    agent.active_tickets.Network.length <
    5
  );
}

async function assignAgent(ticket, agents, queue, noAgent, issue) {
  let agent = agents.find((agent) => agent.main_role == issue);
  if (isFree(agent)) {
    agent.active_tickets[ticket.mainIssue].push(ticket._id);
    await agent.save();
    ticket.ticketStatus = "In Progress";
    ticket.assignedAgent = agent._id;
    await ticket.save();
  } else {
    noAgent.push(ticket);
    queue.enqueue(ticket);
  }
}

setInterval(async () => {
  console.log("Running");
  console.log(HighPriority.front());
  const agents = await supportAgentModel.find({});
  // console.log("agents", agents.length);
  const noAgentHigh = [];
  const noAgentMid = [];
  const noAgentLow = [];

  while (!HighPriority.isEmpty()) {
    console.log("assigning high");
    const ticket = HighPriority.dequeue();
    let agent = agents.find((agent) => agent.main_role == ticket.mainIssue);
    if (isFree(agent)) {
      console.log("agent", agent);
      agent.active_tickets[ticket.mainIssue].push(ticket._id);
      await agent.save();
      ticket.ticketStatus = "In Progress";
      ticket.assignedAgent = agent._id;
      await ticket.save();
      console.log("assigning high: done");
    } else {
      noAgentHigh.push(ticket);
      HighPriority.enqueue(ticket);
    }
    if (HighPriority.front() == noAgentHigh[0]) break;
  }

  while (!MediumPriority.isEmpty()) {
    console.log("assigning medium");
    const ticket = MediumPriority.dequeue();
    let agent = agents.find((agent) => agent.main_role == ticket.mainIssue);
    if (isFree(agent)) {
      agent.active_tickets[ticket.mainIssue].push(ticket._id);
      await agent.save();
      ticket.ticketStatus = "In Progress";
      ticket.assignedAgent = agent._id;
      await ticket.save();
      console.log("assigning mid to main: done");
    } else {
      console.log("assigning mid to other");
      switch (ticket.mainIssue) {
        case "Software": {
          assignAgent(ticket, agents, MediumPriority, noAgentMid, "Hardware");
          console.log("assigning mid to other: software done");
          break;
        }
        case "Hardware": {
          assignAgent(ticket, agents, MediumPriority, noAgentMid, "Network");
          console.log("assigning mid to other: software done");
          break;
        }
        case "Network": {
          assignAgent(ticket, agents, MediumPriority, noAgentMid, "Software");
          break;
        }
      }
    }
    if (MediumPriority.front() == noAgentMid[0]) break;
  }

  while (!LowPriority.isEmpty()) {
    const ticket = LowPriority.dequeue();
    let agent = agents.find((agent) => agent.main_role == ticket.mainIssue);
    if (isFree(agent)) {
      agent.active_tickets[ticket.mainIssue].push(ticket._id);
      await agent.save();
      ticket.ticketStatus = "In Progress";
      ticket.assignedAgent = agent._id;
      await ticket.save();
    } else {
      switch (ticket.mainIssue) {
        case "Software": {
          assignAgent(ticket, agents, LowPriority, noAgentLow, "Network");
          break;
        }
        case "Hardware": {
          assignAgent(ticket, agents, LowPriority, noAgentLow, "Software");

          break;
        }
        case "Network": {
          assignAgent(ticket, agents, LowPriority, noAgentLow, "Hardware");
          break;
        }
      }
    }
    if (LowPriority.front() == noAgentLow[0]) break;
  }
}, 1000 * 60); //* 60 * 5

const clientController = {
  generateWorkflow: async (req, res) => {
    console.log("generating workflow");
    try {
      const { mainIssue, subIssue } = req.query;
      console.log("main issue: ", mainIssue);
      console.log("sub issue: ", subIssue);
      const workflow = await workflowsModel.find({
        $and: [
          { mainIssue: mainIssue },
          { subIssue: subIssue },
        ],
      });
      console.log("workflow: ", workflow);
      return res.status(200).json(workflow);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createTicket: async (req, res) => {
    const decode = jwt.verify(
      req.headers.cookie.split("token=")[1],
      process.env.SECRET_KEY
    );
    const { userId } = decode.user;
    const ticket = new ticketModel({
      userId: userId,
      title: req.body.title,
      description: req.body.description,
      mainIssue: req.body.mainIssue,
      subIssue: req.body.subIssue,
      priority: req.body.priority,
    });

    console.log("priority: ", req.body.priority);
    switch (req.body.priority) {
      
      case "High":
        console.log("ticket adding to high");
        HighPriority.enqueue(ticket);
        console.log(HighPriority.size());
        break;
      case "Medium":
        console.log("ticket adding to medium");
        MediumPriority.enqueue(ticket);
        console.log(MediumPriority.size());
        break;
      case "Low":
        console.log("ticket adding to low");
        LowPriority.enqueue(ticket);
        console.log(LowPriority.size());
        break;
    }

    try {
      const insertTicket = await ticket.save();
      return res.status(201).json(insertTicket);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  getAllTickets: async (req, res) => {
    const decode = jwt.verify(
      req.headers.cookie.split("token=")[1],
      process.env.SECRET_KEY
    );
    const { userId } = decode.user;
    try {
      const tickets = {
        opened: await ticketModel.find({userId: userId, ticketStatus: "Opened"}),
        inProgress: await ticketModel.find({userId: userId, ticketStatus: "In Progress"}),
        closed: await ticketModel.find({userId: userId, ticketStatus: "Closed"}),
      }
      return res.status(200).json(tickets);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  getTicketByMainIssue: async (req, res) => {
    const decode = jwt.verify(
      req.headers.cookie.split("token=")[1],
      process.env.SECRET_KEY
    );
    const { userId } = decode.user;
    const { mainIssue } = req.params;
    try {
      const tickets = {
        opened: await ticketModel.find({userId: userId, ticketStatus: "Opened", mainIssue: mainIssue}),
        inProgress: await ticketModel.find({userId: userId, ticketStatus: "In Progress", mainIssue: mainIssue}),
        closed: await ticketModel.find({userId: userId, ticketStatus: "Closed", mainIssue: mainIssue}),
      }
      return res.status(200).json(tickets);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  rateTicket: async (req, res) => {
    try {
      const ticketId = req.params.ticketId;
      const clientId = req.body.clientId;
      const rating = req.body.rating;

      console.log("ticketId: " + ticketId);

      if (!ticketId || !clientId)
        return res
          .status(400)
          .json({ message: "Ticket ID and Client ID are required" });
      const ticket = await ticketModel.findOne({
        $and: [{ _id: ticketId }, { userId: clientId }],
      });
      if (!ticket) return res.status(400).json({ message: "Ticket not found" });
      if (ticket.rating != -1)
        return res.status(400).json({ message: "Ticket already rated" });

      ticket.rating = rating;
      const updatedTicket = await ticket.save();
      const agent = await supportAgentModel.findById(ticket.assignedAgent);

      // get all resolved tickets that have a rating which is not -1
      const resolvedTickets = await ticketModel.find({
        $and: [{ assignedAgent: agent._id }, { rating: { $ne: -1 } }],
      });
      let totalRating = 0;
      resolvedTickets.forEach((ticket) => {
        totalRating += ticket.rating;
      });
      agent.rating = totalRating / resolvedTickets.length;
      await agent.save();

      return res.status(200).json(updatedTicket);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  updateName: async (req, res) => {
    try {
      if (!req.cookies.token)
        return res.status(401).json("unauthorized access");
      const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      const userId = decoded.user.userId;

            const newName = req.body.newName;
            if(!userId || !newName) return res.status(400).json({ message: "User ID and Name are required" });
            const user = await userModel.findById(userId);
            if(!user) return res.status(400).json({ message: "User not found" });
            user.name = newName;
            const updatedUser = await user.save();
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    enableMFA: async (req, res) => {
      // Check if the user has cookies
      if (!req.cookies.token) return res.json({ message: "unauthorized access" });
      try {
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        const userId = decoded.user.userId;
        const { enteredOTP } = req.body;
        // get the actual secret from the database
        const otpVerification = await UserOTPVerification.findOne({ userId: userId });
        if (!otpVerification) {
          return res.json({
            status: "FAILED",
            message: "OTP verification failed -- This user doesn't have a registered OTP",
          });
        }
        const storedSecret = otpVerification.secret;
        const verified = speakeasy.totp.verify({
          secret: storedSecret,
          encoding: 'ascii',
          token: enteredOTP,
        });
        if (verified) {
          // Update MFAEnabled property
          const user = await userModel.findById(userId);
          user.MFAEnabled = true;
          // Save the changes to the database
          await user.save();
          res.json({
            status: "SUCCESS",
            message: "MFA enabled successfully",
          });
        }
        else {
          res.json({
            status: "FAILED",
            message: "MFA could not be enabled",
            error: "OTP is incorrect",
          });
        }
  
      } catch (error) {
        res.json({
          status: "FAILED",
          message: "MFA could not be enabled",
          error: error.message,
        });
      }
    },
  
    disableMFA: async (req, res) => {
      // Check if the user has cookies
      if (!req.cookies.token) return res.json({ message: "unauthorized access" });
      const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      const userId = decoded.user.userId;
      try {
        const user = await userModel.findById(userId);
        if (!user) {
          return res.json({
            status: "FAILED",
            message: "User not found",
          });
        }
  
        // Update MFAEnabled property
        user.MFAEnabled = false;
  
        // Save the changes to the database
        await user.save();
  
        res.json({
          status: "SUCCESS",
          message: "MFA disabled successfully",
        });
      } catch (error) {
        res.json({
          status: "FAILED",
          message: "MFA could not be disabled",
          error: error.message,
        });
      }
    },
  

    getSecret: async (req, res) => {
      try {
        if (!req.cookies.token) return res.json({ message: "unauthorized access" });
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.user.userId;
        // get the actual secret from the database
        const otpVerification = await UserOTPVerification.findOne({ userId: userId });
        if (!otpVerification) {
          return res.json({
            status: "FAILED",
            message: "OTP verification failed -- This user doesn't have a registered OTP",
          });
        }
        const storedSecret = otpVerification.secret;
        const storedOtpauth_url = otpVerification.otpauth_url;
        let qrcode;
        const dataUrl = await new Promise((resolve, reject) => {
          QRCode.toDataURL(storedOtpauth_url, function (err, data_url) {
              if (err) {
                  console.error('Error generating QR code:', err);
                  reject(err);
              } else {
                  resolve(data_url);
              }
          });
      });
      qrcode = dataUrl;
        res.json({
          status: "SUCCESS",
          message: "Secret retrieved successfully",
          secret: storedSecret,
          otpauth_url: storedOtpauth_url,
          qrcode: qrcode,
        });
      }
      catch (error) {
        res.status(500).json({ message: error.message });
      }
    },

  updateUsername: async (req, res) => {
    try {
      if (!req.cookies.token)
        return res.status(401).json("unauthorized access");
      const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      const userId = decoded.user.userId;

      const newUsername = req.body.newUsername;
      if (!userId || !newUsername)
        return res
          .status(400)
          .json({ message: "User ID and Name are required" });
      const user = await userModel.findById(userId);
      if (!user) return res.status(400).json({ message: "User not found" });
      user.username = newUsername;
      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateEmail: async (req, res) => {
    try {
      if (!req.cookies.token)
        return res.status(401).json("unauthorized access");
      const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      const userId = decoded.user.userId;

      const newEmail = req.body.newEmail;
      if (!userId || !newEmail)
        return res
          .status(400)
          .json({ message: "User ID and Email are required" });
      const user = await userModel.findById(userId);
      if (!user) return res.status(400).json({ message: "User not found" });
      user.email = newEmail;
      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateDOB: async (req, res) => {
    try {
      if (!req.cookies.token)
        return res.status(401).json("unauthorized access");
      const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      const userId = decoded.user.userId;
      const newDOB = req.body.newDOB;
      if (!userId || !newDOB)
        return res
          .status(400)
          .json({ message: "User ID and DOB are required" });
      const user = await userModel.findById(userId);
      if (!user) return res.status(400).json({ message: "User not found" });
      user.DOB = newDOB;
      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateAddress: async (req, res) => {
    try {
      if (!req.cookies.token)
        return res.status(401).json("unauthorized access");
      const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      const userId = decoded.user.userId;
      const newAddress = req.body.newAddress;
      if (!userId || !newAddress)
        return res
          .status(400)
          .json({ message: "User ID and Address are required" });
      const user = await userModel.findById(userId);
      if (!user) return res.status(400).json({ message: "User not found" });
      user.address = newAddress;
      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  changePassword: async (req, res) => {
    try {
      if (!req.cookies.token)
        return res.status(401).json("unauthorized access");
      const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      const userId = decoded.user.userId;
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      if (!userId || !newPassword || !oldPassword)
        return res
          .status(400)
          .json({ message: "User ID and Password are required" });
      const user = await userModel.findById(userId);
      if (!user) return res.status(400).json({ message: "User not found" });

      const passwordMatch = await bcrypt.compare(
        oldPassword,
        user.hashedPassword
      );
      if (!passwordMatch) {
        return res.status(405).json({ message: "incorect password" });
      }
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const newHashedPassword = await bcrypt.hash(newPassword, salt);
      user.hashedPassword = newHashedPassword;
      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      if (!req.cookies.token)
        return res.status(401).json("unauthorized access");
      const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      const userId = decoded.user.userId;
      const user = await userModel.findById(userId);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
module.exports = clientController;
