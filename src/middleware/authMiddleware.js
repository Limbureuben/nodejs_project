// const jwt = require('jsonwebtoken');

// const authMiddleware = (resolve, root, args, context, info) => {
//   const token = context.headers.authorization?.split(' ')[1];
//   if (!token) throw new Error('Unauthorized');

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     context.user = decoded;
//     return resolve(root, args, context, info);
//   } catch (err) {
//     throw new Error('Invalid token');
//   }
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_KEY = process.env.JWT_KEY;

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_KEY);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;