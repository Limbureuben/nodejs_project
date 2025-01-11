const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/tokenUtil');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

const register = async ({ username, email, password, role }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Email already registered');

    const existingUsername = await User.findOne({username});
    if (existingUsername) throw new Error('Username alredy exist');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role: role || 'user', });
    const savedUser =  await newUser.save();
    return {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
    }

};

const getUserById = async (id) => {
    return await User.findById(id);
};

const getAllUsers = async () => {
    return await User.find().select('id username email role');
};


const login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Invalid username or password');
    }

    // Log the user to confirm we retrieved the correct one
    console.log('User retrieved from DB:', user);

    // Check if the password matches (hashed password comparison)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        // If password doesn't match
        throw new Error('Invalid username or password');
    }

    // Generate a JWT token if the username and password are correct
    const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        JWT_KEY,
        { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return user data and token
    return {
        token,
        user
    };
};


module.exports = { register, getUserById, getAllUsers, login };
