const Message = require('../models/message');

class MessageService {
    async createMessage({ email, message}) {
        const newMessage = new Message({
            email,
            message,
            data
        });
        return await newMessage.save();
    }

    async getMessagesByEmail(email) {
        return await Message.find({ email});
    }

    async getAllMessages() {
        return await Message.find();
    }
}

module.exports = new MessageService();