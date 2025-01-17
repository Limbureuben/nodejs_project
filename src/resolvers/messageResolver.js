const messages = [];

const messageResolver = {
    Query: {
        messages: () => messages,
        message: (parent, { id }) => messages.find(message => message.id === id),
    },
    Mutation: {
        createMessage: (parent, { content, author }) => {
            const newMessage = { id: messages.length + 1, content, author };
            messages.push(newMessage);
            return newMessage;
        },
        updateMessage: (parent, { id, content, author }) => {
            const messageIndex = messages.findIndex(message => message.id === id);
            if (messageIndex === -1) {
                throw new Error('Message not found');
            }
            const updatedMessage = { id, content, author };
            messages[messageIndex] = updatedMessage;
            return updatedMessage;
        },
        deleteMessage: (parent, { id }) => {
            const messageIndex = messages.findIndex(message => message.id === id);
            if (messageIndex === -1) {
                throw new Error('Message not found');
            }
            const deletedMessage = messages.splice(messageIndex, 1);
            return deletedMessage[0];
        },
    },
};

module.exports = messageResolver;