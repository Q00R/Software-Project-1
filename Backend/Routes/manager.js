const express = require("express");
const router = express.Router();
const managerController = require("../controllers/managerController");

//respond to user ticket
router.get("/generateAnalytics/:type", managerController.reportAnalytics);

module.exports = router;