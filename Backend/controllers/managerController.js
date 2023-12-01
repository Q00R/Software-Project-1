const supportAgentModel = require("../Models/supportAgentModel");
const userModel = require("../models/userModel");
const ticketModel = require("../models/ticketModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");

const managerController = {
    reportAnalytics: async (req, res) => {
        console.log("we are in report analytics");
    try {

      const analyticsOn = req.params.type;
      if (analyticsOn === 'ticket') {
        console.log('ticket');
        const ticketId = req.body.id;
        console.log(`ticketId: ${ticketId}`);
       
        if (ticketId) {

          const ticket = await ticketModel.findById(ticketId);

          if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
          }

          const ticketIssuerId = ticket.userId;
          const ticketAssignedAgentId = ticket.assignedAgent;

          const [user, assignedAgent] = await Promise.all([
            userModel.findById(ticketIssuerId),
            supportAgentModel.findById(ticketAssignedAgentId),
          ]);

          // Your logic with user and assignedAgent here...

          // Example: Generate a report on ticket status, resolution time, and agent performance
          const report = {
            ticketStatus: ticket.status,
            resolutionTime: calculateResolutionTime(ticket.creationDate, ticket.resolutionDate),
            agentPerformance: assignedAgent.rating,
          };

          return res.status(200).json({ report });
        } else {
          // Generate analytics for all tickets

          // Example: Fetch all tickets and generate a report
          const allData_TicketUserAgent = await ticketModel.aggregate([
            {
              $lookup: {
                from: 'User',
                localField: 'userId',
                foreignField: '_id',
                as: 'userData',
              },
            },
            {
              $lookup: {
                from: 'Support_Agent',
                localField: 'assignedAgent',
                foreignField: '_id',
                as: 'assignedAgentData',
              },
            },
          ]);
          
          const report = allData_TicketUserAgent.map((data) => ({
            ticketStatus: data.status,
            resolutionTime: calculateResolutionTime(data.creationDate, data.resolutionDate),
            ticketRating: data.rating, // Assuming rating is available in the ticket model
            agentPerformance: data.assignedAgentData.rating, // Assuming rating is available in the Support_Agent model
          }));
          

          return res.status(200).json({ report });
        }
      } else if (analyticsOn === 'agent') {
        const agentId = req.params.id;

        // Generate analytics for the agent
        // Example: Fetch the agent and their performance data
        const agent = await supportAgentModel.findById(agentId);

        const report = {
          agentPerformance: agent.rating,
          activeTickets: agent.active_tickets.length,
          resolvedTickets: agent.resolved_tickets.length,
        };

        return res.status(200).json({ report });
      } else if (analyticsOn === 'user') {
        // Generate analytics for the user

        // Example: Fetch the user and their ticket data
        const userId = req.params.id;
        const user = await userModel.findById(userId);
        const userTickets = await ticketModel.find({ userId });

        const report = {
          userName: user.username,
          totalTickets: userTickets.length,
          resolvedTickets: userTickets.filter((ticket) => ticket.status === 'Closed').length,
        };

        return res.status(200).json({ report });
      } else {
        return res.status(400).json({ error: "Invalid analytics type" });
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "An error has occurred" });
    }
  },
};

// Function to calculate resolution time
function calculateResolutionTime(creationDate, resolutionDate) {
  if (creationDate && resolutionDate) {
    const resolutionTimeMs = new Date(resolutionDate) - new Date(creationDate);
    return resolutionTimeMs / (1000 * 60); // Convert milliseconds to minutes
  }
  return null; // Return null if either date is missing
}

module.exports = managerController;
