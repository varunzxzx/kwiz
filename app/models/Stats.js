const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stats = new Schema({
  enrollment: {
    type: String,
    required: true
  },
  total: {
    type: String,
    default: "0"
  },
  prev: {
    type: [String]
  },
  basics: {
    score: [String],
    skip: {
      type: String,
      default: "0"
    }
  },
  functionOverloading: {
    score: [String],
    skip: {
      type: String,
      default: "0"
    }
  },
  constructorDestructor: {
    score: [String],
    skip: {
      type: String,
      default: "0"
    }
  },
  pointer: {
    score: [String],
    skip: {
      type: String,
      default: "0"
    }
  },
  array: {
    score: [String],
    skip: {
      type: String,
      default: "0"
    }
  },
  classesInheritance: {
    score: [String],
    skip: {
      type: String,
      default: "0"
    }
  },
  polymorphism: {
    score: [String],
    skip: {
      type: String,
      default: "0"
    }
  },
}, { collection: 'Stats' });

module.exports = mongoose.model('Stats',Stats);
