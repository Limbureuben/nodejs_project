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