// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here
    req.user = decoded;
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    return res.status(500).json({ message: 'Failed to authenticate token!' });
  }
};

module.exports = authMiddleware;
