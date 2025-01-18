const Message = require('../models/message');


const sendnewMessage =  async ({ email, message}) => {
        const newMessage = new Message({
            email,
            message,
            data
        });
         const savedMessage = await newMessage.save();
         return {
                id: savedMessage._id,
                email: savedMessage.email,
                message: savedMessage.message,
                data: savedMessage.data,
                createdAt: savedMessage.createdAt,
        }         
    }

const getMessagesByEmail =  async (email) => {
        return await Message.find({ email});
    }

const getAllMessages = async () => {
        return await Message.find();
    }


module.exports = { sendnewMessage, getMessagesByEmail, getAllMessages};