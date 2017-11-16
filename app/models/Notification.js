const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notification = new Schema({
    avatar: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    brief: {
        type: String
    },
    date: {
        type: String
    },
    expire_at: {type: Date, default: Date.now, expires: 604800},
    readBy: [String]
}, { collection: 'Notification' });

module.exports = mongoose.model('Notification',Notification);
