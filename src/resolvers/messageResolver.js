const messageService = require('../services/messageService');
const { Query } = require('./bookResolvers');

const messageController = {
    Query: {
        getMessagesByEmail: async (_, {email}) => {
            return await messageService.getMessagesByEmail(email);
        },

        allMessage: async () => {
            return await messageService.getAllMessages();
        },
    },

    Mutation: {
        sendMessage: async (_, {input}) => {
            try {
                const {email, message, data} = input;
                const messages =  await messageService.sendnewMessage({email, message, data});
                return {
                    success: true,
                    message: 'message sent successfully',
                    messages,
                };
            } catch (error) {
                throw new Error(error.messages);
            }
        }
    }
};


module.exports  = messageController;