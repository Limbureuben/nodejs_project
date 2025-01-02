// middleware/authMiddleware.js

// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(403).json({ message: 'No token provided!' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here
//     req.user = decoded;
//     next(); // Proceed to the next middleware/route handler
//   } catch (err) {
//     return res.status(500).json({ message: 'Failed to authenticate token!' });
//   }
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');

const authMiddleware = (resolve, root, args, context, info) => {
  const token = context.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('Unauthorized');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    context.user = decoded;
    return resolve(root, args, context, info);
  } catch (err) {
    throw new Error('Invalid token');
  }
};

module.exports = authMiddleware;