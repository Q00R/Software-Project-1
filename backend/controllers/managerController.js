const supportAgentModel = require("../models/supportagentModel");
const userModel = require("../models/userModel");
const ticketModel = require("../models/ticketModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const { report } = require("../routes/adminRouter");

const managerController = {

  generateAnalytics: async (req, res) => {
    console.log("we are in report analytics");

    try {
  
const Analytics = await ticketModel.aggregate([
  {
    $facet: {
      mainIssueCounts: [
        {
          $group: {
            _id: "$mainIssue",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            mainIssue: "$_id",
            count: "$count",
          },
        },
      ],
      subIssueCounts: [
        {
          $group: {
            _id: {
              mainIssue: "$mainIssue",
              subIssue: "$subIssue",
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            mainIssue: "$_id.mainIssue",
            subIssue: "$_id.subIssue",
            count: "$count",
          },
        },
      ],
      mostFrequentSubIssue: [
        {
          $group: {
            _id: {
              mainIssue: "$mainIssue",
              subIssue: "$subIssue",
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $group: {
            _id: "$_id.mainIssue",
            mostFrequentSubIssue: { $first: "$_id.subIssue" },
            count: { $first: "$count" },
          },
        },
        {
          $project: {
            _id: 0,
            mainIssue: "$_id",
            mostFrequentSubIssue: "$mostFrequentSubIssue",
            count: "$count",
          },
        },
      ],
      subIssueDetails: [
        {
          $group: {
            _id: {
              mainIssue: "$mainIssue",
              subIssue: "$subIssue",
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$_id.mainIssue",
            subIssues: {
              $push: {
                s: "$_id.subIssue",
                Count: "$count",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            mainIssue: "$_id",
            subIssues: 1,
          },
        },
      ],
      subIssueCountsPerMainIssue: [
        {
          $unwind: "$subIssues",
        },
        {
          $group: {
            _id: {
              mainIssue: "$mainIssue",
              subIssue: "$subIssues.s",
            },
            count: { $sum: "$subIssues.Count" },
          },
        },
        {
          $project: {
            _id: 0,
            mainIssue: "$_id.mainIssue",
            subIssue: "$_id.subIssue",
            count: "$count",
          },
        },
        {
          $group: {
            _id: "$mainIssue",
            subIssuesCount: { $addToSet: { subIssue: "$subIssue", count: "$count" } },
          },
        },
        {
          $project: {
            _id: 0,
            mainIssue: "$_id",
            subIssuesCount: 1,
          },
        },
      ],
    },
  },
  {
    $project: {
      mainIssueCounts: 1,
      subIssueCounts: 1,
      mostFrequentSubIssue: 1,
      subIssueDetails: 1,
      subIssueCountsPerMainIssue: 1,
    },
  },
]);

      const analyticsOn = req.params.type;
      if (analyticsOn === 'ticket') {

        try {
          const allAgents = await supportAgentModel.find();
          console.log("allAgents");
          console.log(allAgents);
          
          // Extract user IDs from support agents
          const allAgentUserIds = allAgents.map((data) => data.user);
          console.log("allAgentUserIds");
          console.log(allAgentUserIds);
          
          // const agent_acting_as_user = await Promise.all(
          //   allAgentUserIds.map((userId) => userModel.findById(userId))
          // );
          // console.log("agent_acting_as_user");
          // console.log(agent_acting_as_user);
          // // Now agent_acting_as_user contains the user information for the support agents
         
        } catch (error) {
          // Handle any errors that might occur during the database queries
          console.error("Error fetching agent information:", error);
        }
      console.log("agent_acting_as_user");

     const allData_TicketUserAgent = await ticketModel.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userData",
    },
  },
  { $unwind: "$userData" },
  {
    $lookup: {
      from: "support_agents",
      localField: "assignedAgent",
      foreignField: "_id",
      as: "assignedAgentData",
    },
  },
  { $unwind: { path: "$assignedAgentData", preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: "users",
      localField: "assignedAgentData.user",
      foreignField: "_id",
      as: "assignedAgentUserData",
    },
  },
  { $unwind: { path: "$assignedAgentUserData", preserveNullAndEmptyArrays: true } },
  {
    $project: {
      ticketId: "$_id",
      userIdIssuer: "$userId",
      userEmail: "$userData.email",
      issuerUsername: "$userData.username",
      ticketMainIssue: "$mainIssue",
      ticketSubIssue: "$subIssue",
      tickettitle: "$title",
      ticketStatus: "$ticketStatus",
      ticketCreationDate: "$creationDate",
      ticketResolutionDate: "$resolutionDate",
      resolutionTime: {
        $cond: {
          if: { $ne: ["$resolutionDate", null] },
          then: { $subtract: ["$resolutionDate", "$creationDate"] },
          else: "Not resolved yet",
        }
      },
      ticketRating: {
        $cond: {
          if: { $eq: ["$rating", -1] },
          then: "Not rated",
          else: "$rating",
        },
      },
      assignedAgentId: "$assignedAgent",
      agentRating: {
        $cond: {
          if: { $eq: ["$assignedAgentData.rating", -1] },
          then: "Not rated",
          else: "$assignedAgentData.rating",
        },
      },
      assignedAgentEmail: "$assignedAgentUserData.email",
      assignedAgentUserName: "$assignedAgentUserData.username",
      assignedAgentStatus: "$assignedAgentUserData.status",
      assigbedAgentMainRole: "$assignedAgentData.main_role",
    },
  },
]);

        // join agents on users 

        console.log("allData_TicketUserAgent.assignedAgentFullData");
console.log(allData_TicketUserAgent.assignedAgentFullData);
        console.log('ticket');
        const mainTicketId = req.body.id; // The id of the ticket to generate a report for
        if (mainTicketId) {
          // Generate analytics for the specific ticket
          console.log(`mainTicketId: ${mainTicketId}`);
          const aSpecificTicket = await ticketModel.findById(mainTicketId);
          if (!aSpecificTicket) {
            return res.status(404).json({ error: "Ticket not found" });
          }

          const specificTicketData = allData_TicketUserAgent.find(data => data._id == mainTicketId);
          console.log("specificTicketData", specificTicketData);
          if (specificTicketData) {

            return res.status(200).json({ specificTicketData, Analytics });

          }

          return res.status(200).json({ allData_TicketUserAgent, Analytics });

        } else {
          // Generate analytics for all tickets
          return res.status(200).json({ allData_TicketUserAgent, Analytics });
        }
      }



      else if (analyticsOn === 'agent') {
        const agentId = req.body.id;
        console.log(`agentId: ${agentId}`);
        if (agentId) {
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
        else {
          console.log("we are in else");
          allAgents = await supportAgentModel.find();
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
  }
};


function calcluateResolutionTime(creationDate,resolutionDate) {
  
  //the function returns the resolution time in minutes
  //the function returns null if the ticket does not have a resolution date
  //the function returns null if the ticket does not have a creation date
  if (resolutionDate && creationDate) {
    const resolutionTimeMs = new Date(resolutionDate) - new Date(creationDate);
    const resolutionTime = resolutionTimeMs / (1000 * 60); // Convert milliseconds to minutes

    return resolutionTime;
  } else {
    return null;
  }
} 

// function fastestAgent(allData_TicketUserAgent) {
//   //is a function the returns the fastes agent based on the averages of the resolution time of theire resolved tickets
// //the function takes in a list of objects that containes the data of the tickets and the agents
// //the function returns the agent with the lowest average resolution time
// //the function returns an object that contains the agent id and the average resolution time
// //the function returns null if the list is empty
// //the function returns null if the list does not contain any resolved tickets
//   if (allData_TicketUserAgent.length === 0) {
//     return null; // Return null if the list is empty
//   }

//   let agents = [];

//   for (let i = 0; i < allData_TicketUserAgent.length; i++) {
//     const agentData = allData_TicketUserAgent[i];
//     const agentId = agentData._id;
//     const agentName = agentData.username;
//     const agentResolvedTickets = agentData.resolved_tickets;

//     const agentResolvedTicketsCount = agentResolvedTickets.length;
//     let agentResolvedTicketsSum = 0;

//     if (agentResolvedTicketsCount === 0) {
//       continue; // Skip agents with no resolved tickets
//     }

//     for (let j = 0; j < agentResolvedTicketsCount; j++) {
//       const creationDate = agentResolvedTickets[j].creationDate;
//       const resolutionDate = agentResolvedTickets[j].resolutionDate;

//       if (creationDate && resolutionDate) {
//         const resolutionTimeMs = new Date(resolutionDate) - new Date(creationDate);
//         const resolutionTime = resolutionTimeMs / (1000 * 60); // Convert milliseconds to minutes

//         if (resolutionTime) {
//           agentResolvedTicketsSum += resolutionTime;
//         }
//       }
//     }

//     const agentAvg = agentResolvedTicketsSum / agentResolvedTicketsCount;

//     const agent = {
//       agentId: agentId,
//       agentName: agentName,
//       agentAvg: agentAvg,
//     };

//     agents.push(agent);
//   }

//   // Find the agent with the lowest average resolution time
//   const sortedAgents = agents.sort((a, b) => a.agentAvg - b.agentAvg);

//   if (sortedAgents.length > 0) {
//     const fastestAgent = sortedAgents[0];
//     return fastestAgent;
//   } else {
//     return null; // Return null if no resolved tickets are found
//   }
// }
// function topRatedAgent(allData_TicketUserAgent) {
//   if (allData_TicketUserAgent.length === 0) {
//     return null; // Return null if the list is empty
//   }

//   let agents = [];
//   let highestRatedAgent = null;
//   let highestRating = -1; //ratings are non-negative
//   for (let i = 0; i < allData_TicketUserAgent.length; i++) {
//       let agentData = allData_TicketUserAgent[i];
//       let agentId = agentData._id;
//       let agentName = agentData.username;
//       let agentRating = agentData.rating;

//       agents.push({
//           id: agentId,
//           name: agentName,
//           rating: agentRating
//       });

//       // Check if the current agent has a higher rating than the current highest rated agent
//       if (agentRating > highestRating) {
//           highestRatedAgent = {
//               id: agentId,
//               name: agentName,
//               rating: agentRating
//           };
//           highestRating = agentRating;
//       }
//   }

//   console.log("All agents:", agents);
//   console.log("Highest rated agent:", highestRatedAgent);


//     return highestRatedAgent;



// }

/*function agentsPerformance(allData_TicketUserAgent) {
  console.log(typeof allData_TicketUserAgent);
  const numberOfRows = Object.keys(allData_TicketUserAgent).length;
  console.log(numberOfRows);
  // is a function that calculates the agents performance based on the average of the ratings of the tickets they resolved
  // the function takes in a list of objects that contains the data of the tickets and the agents
  // the function returns an object that contains the agent id and the average rating
  // the function returns null if the list is empty
  // the function returns null if the list does not contain any resolved tickets
  console.log("we are in agentsPerformance function");
  console.log("/////////////////////////////");
  console.log(allData_TicketUserAgent);
  console.log("/////////////////////////////");
  if (Object.keys(allData_TicketUserAgent).length === 0) {
    return null; // Return null if the list is empty
  }

  let agents = [];

  for (const agentData of Object.values(allData_TicketUserAgent)) {
    console.log("we are in outer for loop");
    //const agentData = allData_TicketUserAgent.assignedAgentData._id;
    //console.log(agentData);
    const agentId = agentData._id;
    const agentName = agentData.username;
    const agentResolvedTickets = agentData.resolved_tickets;

    console.log("before the inner loop checking type of agentResolvedTickets");
    console.log(typeof agentResolvedTickets);
    if (!Array.isArray(agentResolvedTickets)) {
      console.log("skippedd");
      continue; // Skip agents with non-array or undefined resolved_tickets
    }
    for (let j = 0; j < agentResolvedTicketsCount; j++) {
  
    const agentResolvedTicketsCount = agentResolvedTickets.length;
    let agentResolvedTicketsSum = 0;

//for const agentResolvedTicket of Object.values(agentResolvedTickets) {
      console.log("we are in for inner loop");
      const rating = agentResolvedTickets[j].rating;

      if (rating !== undefined && rating !== null) {
        agentResolvedTicketsSum += rating;
      }
    }

    const agentAvg =agentResolvedTicketsSum / agentResolvedTicketsCount;
    //const roundedAvg = Math.round(agentAvg * 100) / 100; // Round to 2 decimal places
    console.log(agentAvg);
    const agent = {
      agentId: agentId,
      agentName: agentName,
      agentAvg: roundedAvg,
    };
    //console.log(agent);
    
    agents.push(agent);
    console.log("Average rating of agent");
    console.log(agent.agentAvg)
  }
  console.log("agent");
  //console.log(agents);
  return agents; 
}
*/

//function to calculate the resolution time of a ticket
// function calculateResolutionTime(creationDate, resolutionDate) {
//   console.log("we are in calculateResolutionTime function");
//   if (creationDate && resolutionDate) {
//     const resolutionTimeMs = new Date(resolutionDate) - new Date(creationDate);
//     const resolutionTime = resolutionTimeMs / (1000 * 60); // Convert milliseconds to minutes

//     return resolutionTime;
//   } else {
//     return null;
//   }
// }

module.exports = managerController;
