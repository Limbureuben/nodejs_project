const userService = require('../services/userService');

const registerUser = async (input)=> {
    return await userService.register(input);
};

module.exports = { registerUser };