const express = require("express");
const router = express.Router();
const managerController = require("../controllers/managerController");
const authMiddleware=require('../middleware/authorizationMiddleware');

//router.get("/generateAnalytics/:type",authMiddleware(['manager']), managerController.generateAnalytics);
router.get("/generateAnalytics/:type", managerController.generateAnalytics);

module.exports = router;