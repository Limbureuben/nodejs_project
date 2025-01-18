const userService = require('../services/userService');

const registerUser = async (input) => {
    return await userService.register(input);
};

const authResolvers = {
    authenticateUser
};

module.exports = { registerUser };