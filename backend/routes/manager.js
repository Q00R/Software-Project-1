const express = require("express");
const router = express.Router();
const managerController = require("../controllers/managerController");
const authMiddleware=require('../middleware/authorizationMiddleware');

router.get("/generateAnalytics/:type",authMiddleware(['manager']), managerController.generateAnalytics);

module.exports = router;