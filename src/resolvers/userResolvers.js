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
                // Get the secret key from the environment variables
                const jwtSecretKey = process.env.JWT_KEY;
        
                // Check if the secret key is available
                if (!jwtSecretKey) {
                    throw new Error('JWT_KEY is not defined');
                }
        
                // Attempt to find the user with the provided username and password
                const user = await userService.login(username, password);
        
                // If no user is found, throw an error
                if (!user) {
                    throw new Error('Invalid username or password');
                }
        
                // Generate the JWT token
                const JWT_TOKEN = jwt.sign(
                    { userId: user._id, username: user.username, role: user.role },
                    jwtSecretKey,
                    { expiresIn: '1h' }  // Set token expiration time
                );
        
                // Log the generated token for debugging (remove this in production)
                console.log('Generated JWT Token:', JWT_TOKEN);
        
                // Return the token and user details in the response
                return {
                    JWT_TOKEN,  // Returning the token as JWT_TOKEN
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                };
            } catch (error) {
                // Log the error message and throw it
                console.error('Login failed:', error.message);
                throw new Error(error.message);
            }
        }
        
    },
};

module.exports = userResolvers;


