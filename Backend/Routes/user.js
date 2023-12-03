const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

//respond to user ticket
router.put("/respond/:ticketId", authorizationMiddleware(['agent']), userController.respondToAgentTicket);

module.exports = router;