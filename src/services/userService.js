const User = require('../models/User');
const bcrypt = require('bcrypt');

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

module.exports = { register, getUserById, getAllUsers };
