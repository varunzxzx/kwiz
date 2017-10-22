const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Total = new Schema({
  basics: {
    type: String,
    required: true
  },
  functionOverloading: {
    type: String,
    required: true
  },
  constructorDestructor: {
    type: String,
    required: true
  },
  pointer: {
    type: String,
    required: true
  },
  array: {
    type: String,
    required: true
  },
  classesInheritance: {
    type: String,
    required: true
  },
  polymorphism: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    default: 0
  }
}, { collection: 'Total' });

module.exports = mongoose.model('Total',Total);
