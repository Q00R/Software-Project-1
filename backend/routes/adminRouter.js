const express = require("express");
const router = express.Router();
const authMiddleware=require('../middleware/authorizationMiddleware');
const adminController = require('../controllers/adminController');


//create new user
router.post('/createUser', authMiddleware(['admin']), adminController.createNewUser);
// get user

//view all users
router.get("/viewAllUsers",  authMiddleware(['admin']), adminController.getAllUsers);
//admin changing the role of users
router.put('/changeRole', authMiddleware(['admin']), adminController.adminChangeRole);
module.exports = router;