const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

const register = async ({ username, email, password, role }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Email already registered');

    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new Error('Username already exists');

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Plaintext Password during registration:', password); // Debugging purpose
    console.log('Hashed Password during registration:', hashedPassword); // Debugging purpose
    const newUser = new User({ username, email, password: hashedPassword, role: role || 'customer' });
    const savedUser = await newUser.save();

    return {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
    };
};

const login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        console.error('User not found:', username);
        throw new Error('Invalid username or password');
    }

    console.log('Plaintext Password during login:', password); // Debugging purpose
    console.log('User retrieved from the database:', user);
    console.log('Stored Hashed Password:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isMatch);

    if (!isMatch) {
        console.error('Password does not match for user:', username);
        throw new Error('Invalid username or password');
    }

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

module.exports = { register, login };