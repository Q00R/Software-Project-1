const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController")

router.post("/createChat", chatController.createChat);
router.put("/addMessage",chatController.addMessage);
router.get("/addMessage",chatController.addMessage);

module.exports = router;