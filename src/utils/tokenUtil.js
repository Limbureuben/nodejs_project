const jwt = require('jsonwebtoken');

// Secret key for JWT signing and verification (This should be stored securely, e.g., in environment variables)
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Don't hard-code this in production!

// Token expiration time (can be adjusted based on your needs)
const JWT_EXPIRATION_TIME = '1h'; // Token will expire in 1 hour

/**
 * Generate JWT Token
 * @param {string} userId - The user ID to encode into the JWT payload
 * @returns {string} - The generated JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION_TIME });
};

/**
 * Verify JWT Token
 * @param {string} token - The token to verify
 * @returns {object} - Decoded payload if token is valid, or throws an error if invalid
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return decoded;  // Decoded JWT payload
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = { generateToken, verifyToken };
