const MessageService = require('../services/messageService');

class messageController {
    async sendMessage(req, res) {
        try {
            const { email, message } = req.body;
            const newMessage = await MessageService.createMessage(email, message, data);
            res.status(201).json(newMessage);
        }
        catch (error) {
            return res.status(500).json({ message: error.message});
        }
    }

    async getMessagesByEmail(req, res) {
        try {
            const { email } = req.params;
            const messages = await MessageService.getMessagesByEmail(email);
            res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ message: error.message});
        }
    }

    async getAllMessages(req, res) {
        try {
            const messages = await MessagesServics.getAllMessages();
            res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ message: error.message});
        }
    }
}