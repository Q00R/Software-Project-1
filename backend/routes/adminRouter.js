const express = require("express");
const router = express.Router();
const authMiddleware=require('../middleware/authorizationMiddleware');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController')

//create new user
router.post('/createUser', authMiddleware(['admin']), userController.register);
router.get("/viewAllUsers",  authMiddleware(['admin']), adminController.getAllUsers);
module.exports = router;