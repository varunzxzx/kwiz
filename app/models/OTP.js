const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OTP = new Schema({
    enrollment: {
        type: String
    },
    token: {
        type: String
    }
}, { collection: 'OTP' });

module.exports = mongoose.model('OTP',OTP);
