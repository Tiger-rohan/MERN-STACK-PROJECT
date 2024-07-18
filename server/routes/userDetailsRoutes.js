const express = require('express');
const router = express.Router();
const userDetailsController = require('../controllers/userDetailsControllers');

// Get all user details
router.get('/', userDetailsController.getAllUserDetails);

// Get user details by ID
router.get('/:id', userDetailsController.getUserDetailsById);

// Create new user details
router.post('/', userDetailsController.createUserDetails);

// Update user details by user ID
router.put('/:id', userDetailsController.updateUserDetails);

// Delete user details by ID
router.delete('/:id', userDetailsController.deleteUserDetails);

module.exports = router;
