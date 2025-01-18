const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_KEY, {
        expiresIn: '30d'
    });
};

module.exports = generateToken;