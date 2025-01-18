const messageService = require('../services/messageService');

const messageController = {
    Query: {
        getMessagesByEmail: async (_, { email }) => {
            return await messageService.getMessagesByEmail(email);
        },

        allMessages: async () => {
            return await messageService.getAllMessages();
        },
    },

    Mutation: {
        sendMessage: async (_, { input }) => {
            try {
                const { email, message } = input;
                const messages = await messageService.sendnewMessage({ email, message });
                return {
                    success: true,
                    message: 'Message sent successfully',
                    messages,
                };
            } catch (error) {
                throw new Error(error.message);
            }
        }
    }
};

module.exports = messageController;