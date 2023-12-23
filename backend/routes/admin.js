const express = require("express");
const router = express.Router();
const authMiddleware=require('../middleware/authorizationMiddleware');
const adminController = require('../controllers/adminController.js')

//admin changing the role of users

module.exports = router;