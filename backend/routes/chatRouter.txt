const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController")

router.post("/", chatController.createChat);
router.put("/:id", chatController.addMessage);
router.get("/:id", chatController.getChat);
router.get("/getAllChatsclient/:id", chatController.getAllChatsForClient);
router.get("/getAllChatsagent/:id", chatController.getAllChatsForAgent);

module.exports = router;