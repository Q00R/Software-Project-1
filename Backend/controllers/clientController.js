const ticketModel = require("../models/ticketModel");
const workflowModel = require("../models/workflowsModel");
const supportAgentModel = require("../models/supportAgentModel");

const clientController = {
    ticketForm: async (req, res) => {
        try {

        } catch (error) {

        }
    },

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
            subIssue: req.body.subIssue
        });
        const isNetwork = false;
        const isHardware = false;
        const isSoftware = false;
        switch (req.body.mainIssue) {
            case "Network":
                {
                    isNetwork = true;
                    break;
                }
            case "Hardware":
                {
                    isHardware = true;
                    break;
                }
            case "Software":
                {
                    isSoftware = true;
                    break;
                }
        }
        const mainAgent = await supportAgentModel.find({ main_role: issue }); //DONIA
        const totalNetwork = mainAgent.active_tickets_network.length;
        const totalHardware = mainAgent.active_tickets_hardware.length;
        const totalSoftware = mainAgent.active_tickets_software.length;
        const totalTickets = totalNetwork + totalHardware + totalSoftware;
        //attempt to assign ticket to an agent who's main role is that of the main issue of the ticket
        const assigned = false;
        switch (req.body.mainIssue) {
            case "Network":
                {
                    const percentage = totalNetwork / totalTickets;
                    if (percentage < 0.9) {
                        ticket.assignedAgent = mainAgent._id;
                        mainAgent.active_tickets_network.push(ticket._id);
                        assigned = true;
                    }
                    break;
                }
            case "Hardware":
                {
                    const percentage = totalHardware / totalTickets;
                    if (percentage < 0.9) {
                        ticket.assignedAgent = mainAgent._id;
                        mainAgent.active_tickets_hardware.push(ticket._id);
                        assigned = true;
                    }
                    break;
                }
            case "Software":
                {
                    const percentage = totalSoftware / totalTickets;
                    if (percentage < 0.9) {
                        ticket.assignedAgent = mainAgent._id;
                        mainAgent.active_tickets_software.push(ticket._id);
                        assigned = true;
                    }
                    break;
                }
        }
        //distribute ticket on other agents
        if (!assigned) //if assigned==false
        {
            const assigned2 = false;
            if(isNetwork)
            {
                const agents_hardware = await supportAgentModel.find({ main_role: { $eq: "Hardware" } });
                const agents_software = await supportAgentModel.find({ main_role: { $eq: "Software" } });
                for (let i = 0; i < agents_hardware.length; i++) {
                    const agent = agents_hardware[i];
                    const totalNetwork = agent.active_tickets_network.length;
                    const totalTickets = totalNetwork + totalHardware + totalSoftware;
                    const percentage = totalNetwork / totalTickets;
                    if (percentage < 0.5) {
                        ticket.assignedAgent = agent._id;
                        agent.active_tickets_network.push(ticket._id);
                        assigned2=true;
                    }
                }
                if(!assigned2)
                {
                    for (let i = 0; i < agents_software.length; i++) {
                        const agent = agents_software[i];
                        const totalNetwork = agent.active_tickets_network.length;
                        const totalTickets = totalNetwork + totalHardware + totalSoftware;
                        const percentage = totalNetwork / totalTickets;
                        if (percentage < 0.5) {
                            ticket.assignedAgent = agent._id;
                            agent.active_tickets_network.push(ticket._id);
                            assigned2=true;
                        }
                    }
                }
            }
            else if(isHardware)
            {
                const agents_network = await supportAgentModel.find({ main_role: { $eq: "Network" } });
                const agents_software = await supportAgentModel.find({ main_role: { $eq: "Software" } });
                for (let i = 0; i < agents_network.length; i++) {
                    const agent = agents_network[i];
                    const totalHardware = agent.active_tickets_hardware.length;
                    const totalTickets = totalNetwork + totalHardware + totalSoftware;
                    const percentage = totalHardware / totalTickets;
                    if (percentage < 0.5) {
                        ticket.assignedAgent = agent._id;
                        agent.active_tickets_hardware.push(ticket._id);
                        assigned2=true;
                    }
                }
                if(!assigned2)
                {
                    for (let i = 0; i < agents_software.length; i++) {
                        const agent = agents_software[i];
                        const totalHardware = agent.active_tickets_hardware.length;
                        const totalTickets = totalNetwork + totalHardware + totalSoftware;
                        const percentage = totalHardware / totalTickets;
                        if (percentage < 0.5) {
                            ticket.assignedAgent = agent._id;
                            agent.active_tickets_hardware.push(ticket._id);
                            assigned2=true;
                        }
                    }
                }
            }
            else if(isSoftware)
            {
                const agents_network = await supportAgentModel.find({ main_role: { $eq: "Network" } });
                const agents_hardware = await supportAgentModel.find({ main_role: { $eq: "Hardware" } });
                for (let i = 0; i < agents_network.length; i++) {
                    const agent = agents_network[i];
                    const totalSoftware = agent.active_tickets_software.length;
                    const totalTickets = totalNetwork + totalHardware + totalSoftware;
                    const percentage = totalSoftware / totalTickets;
                    if (percentage < 0.5) {
                        ticket.assignedAgent = agent._id;
                        agent.active_tickets_software.push(ticket._id);
                        assigned2=true;
                    }
                }
                if(!assigned2)
                {
                    for (let i = 0; i < agents_hardware.length; i++) {
                        const agent = agents_hardware[i];
                        const totalSoftware = agent.active_tickets_software.length;
                        const totalTickets = totalNetwork + totalHardware + totalSoftware;
                        const percentage = totalSoftware / totalTickets;
                        if (percentage < 0.5) {
                            ticket.assignedAgent = agent._id;
                            agent.active_tickets_software.push(ticket._id);
                            assigned2=true;
                        }
                    }
                }
            }
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