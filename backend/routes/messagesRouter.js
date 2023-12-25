const router = require("express").Router();
const messagesController = require('../controllers/messagesController.js')

//add
router.post("/", messagesController.addMessage);

//get
router.get("/:conversationId", messagesController.getMessages);

module.exports = router;
