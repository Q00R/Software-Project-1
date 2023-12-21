const ticketModel = require("../Models/ticketModel");
const workflowModel = require("../models/workflowsModel");
const supportAgentModel = require("../Models/supportAgentModel");
const { Queue, HighPriority, MediumPriority, LowPriority } = require("../Queue");

//periodically assign tickets to agents
function isFree(agent) {
    return agent.active_tickets.Software.length + agent.active_tickets.Hardware.length + agent.active_tickets.Network.length < 5;
}

function assignAgent(queue, noAgent, agents, issue, ticket) {
    const agent = agents.find({ main_role: issue });
    if (isFree(otherAgent)) {
        ticket.assignedAgent = otherAgent._id;
        ticket.ticketStatus = "In Progress";
        agent.active_tickets[ticket.mainIssue].push(ticket._id);
    }
    else {
        noAgent.push(ticket);
        queue.enqueue(ticket);
    }
}
setInterval(async () => {
    agents = await supportAgentModel.find({ status: "Activated" });
    //loop through all agents
    const noAgentHigh = [];
    const noAgentMid = [];
    const noAgentLow = [];
    while (!HighPriority.isEmpty()) {
        const ticket = HighPriority.dequeue();
        assignAgent(HighPriority, noAgentHigh, agents, ticket.mainIssue, ticket)
        if (HighPriority.front() == noAgentHigh[0])
            break;
    }
    while (!MediumPriority.isEmpty()) {
        const ticket = MediumPriority.dequeue();
        const agent = agents.find({ main_role: ticket.mainIssue });
        if (isFree(agent)) {
            ticket.assignedAgent = agent._id;
            ticket.ticketStatus = "In Progress";
            agent.active_tickets[ticket.mainIssue].push(ticket._id);
        }
        else {
            switch (ticket.mainIssue) {
                case "Software":
                    {
                        assignAgent(MediumPriority, noAgentMid, agents, "Hardware", ticket)
                        break;
                    }
                case "Hardware":
                    {
                        assignAgent(MediumPriority, noAgentMid, agents, "Network", ticket)
                        break;
                    }
                case "Network":
                    {
                        assignAgent(MediumPriority, noAgentMid, agents, "Software", ticket)
                        break;
                    }
            }
        }
        if (MediumPriority.front() == noAgentMid[0])
            break;
    }
    while (!LowPriority.isEmpty()) {
        const ticket = LowPriority.dequeue();
        const agent = agents.find({ main_role: ticket.mainIssue });
        if (isFree(agent)) {
            ticket.assignedAgent = agent._id;
            ticket.ticketStatus = "In Progress";
            agent.active_tickets[ticket.mainIssue].push(ticket._id);
        }
        else {
            switch (ticket.mainIssue) {
                case "Software":
                    {
                        assignAgent(LowPriority, noAgentLow, agents, "Network", ticket)
                        break;
                    }
                case "Hardware":
                    {
                        assignAgent(LowPriority, noAgentLow, agents, "Software", ticket)
                        break;
                    }
                case "Network":
                    {
                        assignAgent(LowPriority, noAgentLow, agents, "Hardware", ticket)
                        break;
                    }
            }
        }
        if (LowPriority.front() == noAgentLow[0])
            break;
    }
}, 1000 * 60 * 5);

const clientController = {
    generateWorkflow: async (req, res) => {
        try {
            const { main, sub } = req.params;
            const workflow = await workflowModel.find({ $and: [{ mainIssue: { $eq: main } }, { subIssue: { $eq: sub } }] });
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

        // //attempt to assign ticket to an agent who's main role is that of the main issue of the ticket
        // const mainAgent = await supportAgentModel.findOne({ main_role: issue }); //DONIA
        // const totalTickets = mainAgent.active_tickets.Software.length + mainAgent.active_tickets.Hardware.length + mainAgent.active_tickets.Network.length;
        // const assigned = false;
        // if ((mainAgent.active_tickets[req.body.mainIssue].length == 0) || (mainAgent.active_tickets[req.body.mainIssue].length / totalTickets < 0.9)) {
        //     ticket.assignedAgent = mainAgent._id;
        //     mainAgent.active_tickets[req.body.mainIssue].push(ticket._id);
        //     assigned = true;
        // }
        // else {
        //     const subAgenst = await supportAgentModel.find({ main_role: { $ne: issue } });
        //     for (let i = 0; i < subAgenst.length; i++) {
        //         const agent = subAgenst[i];
        //         const totalTickets = agent.active_tickets.Software.length + agent.active_tickets.Hardware.length + agent.active_tickets.Network.length;
        //         if ((mainAgent.active_tickets[req.body.mainIssue].length == 0) || (agent.active_tickets[req.body.mainIssue].length / totalTickets < 0.05)) {
        //             ticket.assignedAgent = agent._id;
        //             agent.active_tickets[req.body.mainIssue].push(ticket._id);
        //             assigned = true;
        //             break;
        //         }
        //     }
        // }
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
            const tickets = await ticketModel.find({ $and: [{ userId: req.userId }, { ticketStatus: req.params.status }] });
            return res.status(200).json(tickets);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    getTicket: async (req, res) => {
        try {
            const ticket = await ticketModel.find({ $and: [{ id: req.params.ticketId }, { userId: req.userId }] }); //DONIA
            return res.status(200).json(ticket);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
};
module.exports = clientController;