const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentContoller");
const authMiddleware = require("../middleware/authorizationMiddleware");

//respond to user ticket
router.put("/respond/:ticketId", authMiddleware(['agent']), agentController.respondToTicket);
//Resolve ticket
router.put("/resolve/:ticketId", authMiddleware(['agent']), agentController.resolveTicket);
//View assigned agent's tickets
router.get("/viewActiveTickets/", authMiddleware(['agent']), agentController.viewMyActiveTickets);
router.get("/viewResolvedTickets", authMiddleware(['agent']), agentController.viewMyResolvedTickets);

module.exports = router;