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
        }
        
    }
};

module.exports = userResolvers;


