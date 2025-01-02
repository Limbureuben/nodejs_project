const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    return await newUser.save();
};

const getUserById = async (id) => {
    return await User.findById(id);
};

module.exports = { register, getUserById };
