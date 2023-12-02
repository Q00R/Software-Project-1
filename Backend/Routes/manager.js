const express = require("express");
const router = express.Router();
const managerController = require("../controllers/managerController");

//respond to user ticket
router.get("/generateAnalytics/:type", managerController.generateAnalytics);
router.get("/report", managerController.generateReport);

module.exports = router;