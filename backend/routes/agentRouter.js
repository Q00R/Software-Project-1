const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentContoller");
const authMiddleware = require("../middleware/authorizationMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");


//respond to user ticket
router.put("/respond/:ticketId", agentController.respondToTicket);
//Resolve ticket
router.put("/resolve/:ticketId", agentController.resolveTicket);
//View assigned agent's tickets
router.get("/viewAgentTickets", agentController.viewAllTickets);
router.get("/viewActiveTickets", agentController.viewMyActiveTickets);
router.get("/viewResolvedTickets", agentController.viewMyResolvedTickets);

module.exports = router;