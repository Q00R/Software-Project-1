const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentContoller");
const authMiddleware = require("../middleware/authorizationMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

//respond to user ticket
router.put("/respond/:ticketId" ,agentController.respondToTicket);
//Resolve ticket
router.put("/resolve/:ticketId", agentController.resolveTicket);
//View assigned agent's tickets
router.get("/viewActiveTickets:ticketId/:ticketStatus", agentController.viewMyActiveTickets);
router.get("/viewResolvedTickets:ticketId/:ticketStatus", agentController.viewMyResolvedTickets);

module.exports = router;