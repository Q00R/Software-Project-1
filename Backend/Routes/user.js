const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//respond to user ticket
router.put("/respond/:ticketId", userController.respondToAgentTicket);

module.exports = router;