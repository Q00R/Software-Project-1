const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authorizationMiddleware');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');

// create new user
router.post('/createUser', authMiddleware(['admin']), userController.register);

// view all users
router.get("/viewAllUsers", authMiddleware(['admin']), adminController.getAllUsers);

// admin changing the role of users
router.put('/changeRole', authMiddleware(['admin']), adminController.adminChangeRole);

// Themes
// admin changing the role of users
router.get('/viewThemes', authMiddleware(['admin']), adminController.getAllThemes);

// admin creating a new theme
router.post('/createTheme', authMiddleware(['admin']), adminController.createTheme);

// admin updating a theme
router.put('/updateTheme', authMiddleware(['admin']), adminController.updateTheme);

// admin deleting a theme
router.delete('/deleteTheme/:id', authMiddleware(['admin']), adminController.deleteTheme);

module.exports = router;