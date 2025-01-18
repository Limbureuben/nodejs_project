const jwt = require('jsonwebtoken');


const JWT_KEY = process.env.JWT_KEY || 'your-secret-key';


const JWT_EXPIRATION_TIME = '1h';

/**
 * Generate JWT Token
 * @param {string} userId
 * @returns {string}
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_KEY, { expiresIn: JWT_EXPIRATION_TIME });
};

/**
 * Verify JWT Token
 * @param {string} token - The token to verify
 * @returns {object} - Decoded payload if token is valid, or throws an error if invalid
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    return decoded;  // Decoded JWT payload
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = { generateToken, verifyToken };
