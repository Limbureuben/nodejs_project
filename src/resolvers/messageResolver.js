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
            const {email, message, data} = input;
            return await messageService.createMessage({email, message, data});
        }
    }
};


module.exports  = messageController;