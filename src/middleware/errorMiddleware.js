// // src/middleware/errorMiddleware.js

// const errorMiddleware = (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
//   };
  
//   module.exports = errorMiddleware;

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
};

module.exports = errorMiddleware;
  