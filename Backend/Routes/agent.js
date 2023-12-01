const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");

//respond to user ticket
router.put("/respond/:ticketId", agentController.respondToTicket);
//Resolve ticket
router.put("/resolve/:ticketId", agentController.resolveTicket);
//View assigned agent's tickets
router.get("/viewActiveTickets:ticketId/:ticketStatus", agentController.viewMyActiveTickets);
router.get("/viewResolvedTickets:ticketId/:ticketStatus", agentController.viewMyResolvedTickets);

module.exports = router;