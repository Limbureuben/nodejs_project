const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const bookResolvers = require('./src/resolvers/bookResolvers');
const bookTypeDefs = require('./src/schemas/bookSchemas');
const authMiddleware = require('./src/middleware/authMiddleware');
const errorMiddleware = require('./src/middleware/errorMiddleware');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Create ApolloServer instance
const server = new ApolloServer({
    typeDefs: bookTypeDefs,
    resolvers: bookResolvers,
});

// Ensure server starts before applying middleware
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    const port = process.env.PORT || 4000;
    app.use(express.json());
    app.use(errorMiddleware);

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

// Start the server
startServer();
