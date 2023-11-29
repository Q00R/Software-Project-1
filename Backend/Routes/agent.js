const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");

//respond to user ticket
router.put("/respond/:ticketId/", agentController.respondToTicket);

module.exports = router;