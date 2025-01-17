const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    email: {
        type:String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Message', messageSchema);