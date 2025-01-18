const errorMiddleware = require('../middleware/errorMiddleware');
const userService = require('../services/userService');
require('dotenv').config({ path: '../../.env' });
const jwt = require('jsonwebtoken');

const userResolvers = {
    Query: {
        getUser: async (_, { id }) => {
            const user = await userService.getUserById(id);
            if(!user) {
                throw new Error('User not found');
            }
            return user;
        },

        getAllUsers: async () => {
            const users = await userService.getAllUsers();
            return users;
        }
    },
    
    Mutation: {
        registerUser: async (_, { input }) => {
            try {
                const { username, email, password, role } = input;
                const user = await userService.register({username, email, password, role});
                return {
                    success: true,
                    message: 'User registred successfully',
                    user,
                };
            } catch (error) {
                throw new Error(error.message);
            }
        },

        loginUser: async (_, { input }) => {
            const { username, password } = input;
            try {
                // Get the JWT secret key
                const jwtSecretKey = process.env.JWT_KEY;
                if (!jwtSecretKey) {
                    throw new Error('JWT_KEY is not defined');
                }
        
                // Authenticate user
                const result = await userService.login(username, password);
        
                // If the login function failed to return a token or user, handle it
                if (!result || !result.token) {
                    throw new Error('Authentication failed. Token not generated.');
                }
        
                // Return the token and user
                return {
                    token: result.token, // Ensure this is non-null
                    user: result.user,   // Ensure this matches the AuthPayload type
                };
            } catch (error) {
                console.error('Login failed:', error.message);
                throw new Error(error.message);
            }
        }
        
    },
};

module.exports = userResolvers;


