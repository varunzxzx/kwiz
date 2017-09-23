const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({
  question: {
    type: String,
    required: true
  },
  op1: {
    type: String,
    required: true
  },
  op2: {
    type: String,
    required: true
  },
  op3: {
    type: String,
    required: true
  },
  op4: {
    type: String,
    required: true
  },
  crct: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  code: {
    type:String,
    required: true
  }
}, { collection: 'Questions' });

module.exports = mongoose.model('Question',Question);
