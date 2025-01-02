// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error(`Error: ${err.message}`);
//     process.exit(1); // Exit process with failure
//   }
// };

// module.exports = connectDB;


const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Retrieve the DB URI from environment variables
        const dbURI = process.env.DB_URI;

        // Check if dbURI is undefined
        if (!dbURI) {
            throw new Error("MongoDB URI not found in environment variables.");
        }

        // Connect to MongoDB
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
