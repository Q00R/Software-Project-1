const ticketModel = require("../models/ticketModel");
const workflowModel = require("../models/workflowsModel");

const clientController = {
    ticketForm: async (req,res) =>
    {
        try {
            
        } catch (error) {
            
        }
    },

    generateWorkflow: async (req,res) =>
    {
        try {
            const {main, sub} = req.params;
            const workflow = await workflowModel.find({$and: [{mainIssue: {$eq: main}}, {subIssue: {$eq: sub}}]});
            return res.status(200).json(workflow);  
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    createTicket: async (req, res) =>
    {
        const ticket = new ticketModel({
            userId: req.userId, //DONIA
            creationDate,
            title: req.body.title,
            description: req.body.description,
            ticketStatus,
            mainIssue: req.body.mainIssue,
            subIssue: req.body.subIssue
        });
        try {
            const insertTicket = await ticket.save();
            return res.status(201).json(insertTicket);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    getAllTickets: async (req,res) => 
    {
        try {
            const tickets = await ticketModel.find({userId: req.userId}); //DONIA
            return res.status(200).json(tickets);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    getTicketByStatus: async (req,res) => 
    {
        try {
            const tickets = await ticketModel.find({$and: [{userId: req.userId}, {ticketStatus: req.params.status}]});
            return res.status(200).json(tickets);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    getTicket: async (req,res) => 
    {
        try {
            const ticket = await ticketModel.find({$and: [{id: req.params.ticketId}, {userId: req.userId}]}); //DONIA
            return res.status(200).json(ticket);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
};
module.exports = clientController;