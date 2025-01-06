const errorMiddleware = require('../middleware/errorMiddleware');
const userService = require('../services/userService');


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
             const {username, password} = input;
            try {
                const user = await userService.login(username, password);
                if (!user) {
                    throw new Error ('Invalid username or password');
                }

                const token = jwt.sign(
                    { userId: user._id, username: user.username, role: user.role }, // Payload
                    process.env.JWT_SECRET_KEY || 'your-secret-key', // Secret key from environment or default
                    { expiresIn: '1h' } // Set token expiry time
                );

                return {
                    token, 
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                };
            } catch (error) {
                console.error('Login failed:', error);
                throw new Error(error.message);
            }
        }
    },

};

module.exports = userResolvers;


