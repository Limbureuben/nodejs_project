// const userService = require('../services/userService');
// require('dotenv').config({ path: '../../.env' });
// const jwt = require('jsonwebtoken');

// const userResolvers = {
//     Query: {
//         getUser: async (_, { id }) => {
//             try {
//                 const user = await userService.getUserById(id);
//                 if (!user) {
//                     throw new Error('User not found');
//                 }
//                 return user;
//             } catch (error) {
//                 console.error('Error fetching user:', error.message);
//                 throw new Error(error.message);
//             }
//         },

//         getAllUsers: async () => {
//             try {
//                 const users = await userService.getAllUsers();
//                 return users;
//             } catch (error) {
//                 console.error('Error fetching all users:', error.message);
//                 throw new Error(error.message);
//             }
//         }
//     },
    
//     Mutation: {
//         registerUser: async (_, { input }) => {
//             try {
//                 const { username, email, password, role } = input;
//                 console.log('Register input:', input); // Debugging purpose
//                 const user = await userService.register({ username, email, password, role });
//                 console.log('User registered:', user); // Debugging purpose
//                 return {
//                     success: true,
//                     message: 'User registered successfully',
//                     user,
//                 };
//             } catch (error) {
//                 console.error('Error registering user:', error.message);
//                 throw new Error(error.message);
//             }
//         },

//         loginUser: async (_, { input }) => {
//             const { username, password } = input;
//             try {
//                 console.log('Login input:', input); // Debugging purpose
//                 const jwtSecretKey = process.env.JWT_KEY;
//                 if (!jwtSecretKey) {
//                     throw new Error('JWT_KEY is not defined');
//                 }

//                 const result = await userService.login(username, password);

//                 if (!result || !result.token) {
//                     throw new Error('Authentication failed. Token not generated.');
//                 }

//                 console.log('Login result:', result); // Debugging purpose

//                 return {
//                     token: result.token,
//                     user: result.user,
//                 };
//             } catch (error) {
//                 console.error('Login failed:', error.message);
//                 throw new Error(error.message);
//             }
//         }
//     },
// };

// module.exports = userResolvers;



const { registerUser, loginUser } = require('../services/userService');

const userResolvers = {
    Query: {
        login: async (_, { username, password }) => {
            try {
                const user = await loginUser(username, password);
                return {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: user.token
                };
            } catch (error) {
                throw new Error(error.message);
            }
        }
    },
    Mutation: {
        register: async (_, { input }) => {
            try {
                const user = await registerUser(input);
                return {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: user.token
                };
            } catch (error) {
                throw new Error(error.message);
            }
        }
    }
};

module.exports = userResolvers;