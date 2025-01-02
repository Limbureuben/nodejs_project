const userService = require('../services/userService');

const userResolvers = {
    Query: {
        getUser: async (_, { id }) => await userService.getUserById(id),
    },
    Mutation: {
        registerUser: async (_, { input }) => await userService.register(input),
    },
};

module.exports = userResolvers;


