const supportAgentModel = require("../Models/supportAgentModel");
const userModel = require("../models/userModel");
const ticketModel = require("../models/ticketModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");

const managerController = {
  generateReport: async (req, res) => {},
  generateAnalytics: async (req, res) => {
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

          

          //  Generate a report on ticket status, resolution time, and agent performance
          const report = {
            ticketStatus: ticket.status,
            resolutionTime: calculateResolutionTime(ticket.creationDate, ticket.resolutionDate),
            agentPerformance: assignedAgent.rating,
          };

          return res.status(200).json({ report });
        } else {
          // Generate analytics for all tickets

          
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
      } 
      else if (analyticsOn === 'agent') {
        const agentId = req.body.id;
        console.log(`agentId: ${agentId}`);
      if(agentId){
        // Generate analytics for the agent
        // Example: Fetch the agent and their performance data
        const agent = await supportAgentModel.findById(agentId);

        const report = {
          agentPerformance: agent.rating,
          activeTickets: agent.active_tickets.length,
          resolvedTickets: agent.resolved_tickets.length,
        };
        return res.status(200).json({ report });

      }
      else{
        console.log("we are in else");
        allAgents= await supportAgentModel.find();
        console.log(allAgents);

        const report = allAgents.map((data) => {
          const agentPerformance = data.rating
          const activeTickets = data.active_tickets.length;


          const resolvedTickets = data.resolved_tickets.length;
             console.log(agentPerformance);
             console.log(activeTickets);
             console.log(resolvedTickets);
             return {
              agentPerformance,
              activeTickets,
              resolvedTickets,
            };
         
        });
       // return res.status(200).json({ report });
       return res.status(200).json({
        greeting: "hii",
        report: { report },
        fastestAgent: 'fastest agent',
        fastestAgentData: fastestAgent(allAgents),
        topRatedAgent: 'Top rated agent',
        topRatedAgentData: topRatedAgent(allAgents)
      });
            }

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

function fastestAgent(allData_TicketUserAgent) {
  //is a function the returns the fastes agent based on the averages of the resolution time of theire resolved tickets
//the function takes in a list of objects that containes the data of the tickets and the agents
//the function returns the agent with the lowest average resolution time
//the function returns an object that contains the agent id and the average resolution time
//the function returns null if the list is empty
//the function returns null if the list does not contain any resolved tickets
  if (allData_TicketUserAgent.length === 0) {
    return null; // Return null if the list is empty
  }

  let agents = [];

  for (let i = 0; i < allData_TicketUserAgent.length; i++) {
    const agentData = allData_TicketUserAgent[i];
    const agentId = agentData._id;
    const agentName = agentData.username;
    const agentResolvedTickets = agentData.resolved_tickets;

    const agentResolvedTicketsCount = agentResolvedTickets.length;
    let agentResolvedTicketsSum = 0;

    if (agentResolvedTicketsCount === 0) {
      continue; // Skip agents with no resolved tickets
    }

    for (let j = 0; j < agentResolvedTicketsCount; j++) {
      const creationDate = agentResolvedTickets[j].creationDate;
      const resolutionDate = agentResolvedTickets[j].resolutionDate;

      if (creationDate && resolutionDate) {
        const resolutionTimeMs = new Date(resolutionDate) - new Date(creationDate);
        const resolutionTime = resolutionTimeMs / (1000 * 60); // Convert milliseconds to minutes

        if (resolutionTime) {
          agentResolvedTicketsSum += resolutionTime;
        }
      }
    }

    const agentAvg = agentResolvedTicketsSum / agentResolvedTicketsCount;

    const agent = {
      agentId: agentId,
      agentName: agentName,
      agentAvg: agentAvg,
    };

    agents.push(agent);
  }

  // Find the agent with the lowest average resolution time
  const sortedAgents = agents.sort((a, b) => a.agentAvg - b.agentAvg);

  if (sortedAgents.length > 0) {
    const fastestAgent = sortedAgents[0];
    return fastestAgent;
  } else {
    return null; // Return null if no resolved tickets are found
  }
}
function topRatedAgent(allData_TicketUserAgent) {
  if (allData_TicketUserAgent.length === 0) {
    return null; // Return null if the list is empty
  }

  let agents = [];
  let highestRatedAgent = null;
  let highestRating = -1; // Assuming ratings are non-negative, adjust if ratings can be negative
  
  for (let i = 0; i < allData_TicketUserAgent.length; i++) {
      let agentData = allData_TicketUserAgent[i];
      let agentId = agentData._id;
      let agentName = agentData.username;
      let agentRating = agentData.rating;
  
      agents.push({
          id: agentId,
          name: agentName,
          rating: agentRating
      });
  
      // Check if the current agent has a higher rating than the current highest rated agent
      if (agentRating > highestRating) {
          highestRatedAgent = {
              id: agentId,
              name: agentName,
              rating: agentRating
          };
          highestRating = agentRating;
      }
  }
  
  console.log("All agents:", agents);
  console.log("Highest rated agent:", highestRatedAgent);
  

    return highestRatedAgent;
    

    
}



module.exports = managerController;
