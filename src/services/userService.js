const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (userData) => {
    const { username, password, email, role = 'customer' } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        password: hashedPassword,
        email,
        role
    });

    try {
        await user.save();
        const token = generateToken(user._id);
        return { ...user.toObject(), token };
    } catch (error) {
        if (error.code === 11000) {
 
            if (error.keyPattern.username) {
                throw new Error('Username already exists');
            }
            if (error.keyPattern.email) {
                throw new Error('Email already exists');
            }
        }
        throw error; // Re-throw other errors
    }
};

const loginUser = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = generateToken(user._id);
    return { ...user.toObject(), token };
};

