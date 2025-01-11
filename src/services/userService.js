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

    console.log('User retrieved from the database:', user);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid username or password');
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
    );

    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    };
};


module.exports = { register, getUserById, getAllUsers, login };
