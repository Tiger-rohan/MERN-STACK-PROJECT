const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

// Test endpoint
const test = (req, res) => {
    res.json("testing server");
};

// Register endpoint
const registerUser = async (req, res) => {
    try {
        const { user_name, email, password, role } = req.body;

        // Check if user exists
        if (!user_name) {
            return res.json({ error: "Name is required" });
        }

        // Check if password is good
        if (!password || password.length < 6) {
            return res.json({ error: "Password is required and should be at least 6 characters long" });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: "Email is already taken" });
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({ user_name, email, password: hashedPassword, role });

        return res.json(user); // Return user details excluding password
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
};

// Get all registered users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password from the response
        res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ error: "No user found" });
        }

        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign({ email: user.email, id: user.user_id, name: user.user_name, role: user.role }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({ ...user.toObject(), password: undefined }); // Exclude password from response
            });
        } else {
            res.json({ error: "Wrong Password" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ msg: 'Token is not valid' });
            }
            try {
                const user = await User.findById(decodedToken.id).select('-password'); // Exclude password from the response
                if (!user) {
                    return res.status(404).json({ msg: 'User not found' });
                }
                res.json(user);
            } catch (error) {
                console.error(error.message);
                res.status(500).send('Server error');
            }
        });
    } else {
        res.json(null);
    }
};

module.exports = { test, registerUser, loginUser, getProfile, getUsers };
