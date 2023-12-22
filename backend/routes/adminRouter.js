const express = require("express");
const router = express.Router();
const authMiddleware=require('../middleware/authorizationMiddleware');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController')
const clientController = require('../controllers/clientController')

//create new user
router.post('/createUser', authMiddleware(['admin']), userController.register);

// get user

//get all users
router.get("/viewAllUsers",  authMiddleware(['admin']), adminController.getAllUsers);
module.exports = router;