const ticketModel = require("../models/ticketModel");
const workflowModel = require("../models/workflowsModel");
const supportAgentModel = require("../models/supportAgentModel");
const {
  Queue,
  HighPriority,
  MediumPriority,
  LowPriority,
} = require("../Queue");

function isFree(agent) {
  return (
    agent.active_tickets.Software.length +
      agent.active_tickets.Hardware.length +
      agent.active_tickets.Network.length <
    5
  );
}

async function assignAgent(ticket, agents, queue, noAgent, issue) {
  let agent = agents.find({ issue });
  if (isFree(agent)) {
    agent.active_tickets[ticket.mainIssue].push(ticket._id);
    await agent.save();
    ticket.ticketStatus = "In Progress";
    ticket.assignAgent = agent._id;
    await ticket.save();
  } else {
    noAgent.push(ticket);
    queue.enqueue(ticket);
  }
}

setInterval(async () => {
  const agents = await supportAgentModel.find({ status: "Activated" });
  const noAgentHigh = [];
  const noAgentMid = [];
  const noAgentLow = [];

  while (!HighPriority.isEmpty()) {
    const ticket = HighPriority.dequeue();
    let agent = agents.find({ main_role: ticket.mainIssue });
    if (isFree(agent)) {
      agent.active_tickets[ticket.mainIssue].push(ticket._id);
      await agent.save();
      ticket.ticketStatus = "In Progress";
      ticket.assignAgent = agent._id;
      await ticket.save();
    } else {
      noAgentHigh.push(ticket);
      HighPriority.enqueue(ticket);
    }
    if (HighPriority.front() == noAgentHigh[0]) break;
  }

  while (!MediumPriority.isEmpty()) {
    const ticket = MediumPriority.dequeue();
    let agent = agents.find({ main_role: ticket.mainIssue });
    if (isFree(agent)) {
      agent.active_tickets[ticket.mainIssue].push(ticket._id);
      await agent.save();
      ticket.ticketStatus = "In Progress";
      ticket.assignAgent = agent._id;
      await ticket.save();
    } else {
      switch (ticket.mainIssue) {
        case "Software": {
          assignAgent(ticket, agents, MediumPriority, noAgentMid, "Hardware");
          break;
        }
        case "Hardware": {
          assignAgent(ticket, agents, MediumPriority, noAgentMid, "Network");
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
    let agent = agents.find({ main_role: ticket.mainIssue });
    if (isFree(agent)) {
      agent.active_tickets[ticket.mainIssue].push(ticket._id);
      await agent.save();
      ticket.ticketStatus = "In Progress";
      ticket.assignAgent = agent._id;
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
}, 1000 * 60 * 5);

const clientController = {
  generateWorkflow: async (req, res) => {
    try {
      const { main, sub } = req.params;
      const workflow = await workflowModel.find({
        $and: [{ mainIssue: { $eq: main } }, { subIssue: { $eq: sub } }],
      });
      return res.status(200).json(workflow);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createTicket: async (req, res) => {
    const ticket = new ticketModel({
      userId: req.userId, //DONIA
      creationDate,
      title: req.body.title,
      description: req.body.description,
      ticketStatus,
      mainIssue: req.body.mainIssue,
      subIssue: req.body.subIssue,
      priority: req.body.priority,
    });

    switch (req.body.priority) {
      case "High":
        HighPriority.enqueue(ticket);
        break;
      case "Medium":
        MediumPriority.enqueue(ticket);
        break;
      case "Low":
        LowPriority.enqueue(ticket);
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
    try {
      const tickets = await ticketModel.find({ userId: req.userId }); //DONIA
      return res.status(200).json(tickets);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  getTicketByStatus: async (req, res) => {
    try {
      const tickets = await ticketModel.find({
        $and: [{ userId: req.userId }, { ticketStatus: req.params.status }],
      });
      return res.status(200).json(tickets);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  getTicket: async (req, res) => {
    try {
      const ticket = await ticketModel.find({
        $and: [{ id: req.params.ticketId }, { userId: req.userId }],
      }); //DONIA
      return res.status(200).json(ticket);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
module.exports = clientController;
