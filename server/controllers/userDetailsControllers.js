const UserDetails = require('../models/UserDetails');

// Get all user details
exports.getAllUserDetails = async (req, res) => {
    try {
        const userDetails = await UserDetails.find();
        res.status(200).json(userDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user details by ID
exports.getUserDetailsById = async (req, res) => {
    try {
        const userDetails = await UserDetails.findById(req.params.id);
        if (!userDetails) {
            return res.status(404).json({ message: 'User details not found' });
        }
        res.status(200).json(userDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new user details
exports.createUserDetails = async (req, res) => {
    const userDetails = new UserDetails(req.body);
    try {
        const savedUserDetails = await userDetails.save();
        res.status(201).json(savedUserDetails);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update user details by ID
exports.updateUserDetails = async (req, res) => {
    try {
        const userDetails = await UserDetails.findOne({ user_id: req.params.id });

        if (!userDetails) {
            return res.status(404).json({ message: 'User details not found' });
        }

        userDetails.ProjectDescription.push(req.body.ProjectDescription[0]);

        const updatedUserDetails = await userDetails.save();
        res.status(200).json(updatedUserDetails);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};


// Delete user details by ID
exports.deleteUserDetails = async (req, res) => {
    try {
        const deletedUserDetails = await UserDetails.findByIdAndDelete(req.params.id);
        if (!deletedUserDetails) {
            return res.status(404).json({ message: 'User details not found' });
        }
        res.status(200).json({ message: 'User details deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
