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
    total: {
      type: Number,
      default: 0
    },
    skip: {
      type: String,
      default: "0"
    }
  },
  functionOverloading: {
    score: [String],
    total: {
      type: Number,
      default: 0
    },
    skip: {
      type: String,
      default: "0"
    }
  },
  constructorDestructor: {
    score: [String],
    total: {
      type: Number,
      default: 0
    },
    skip: {
      type: String,
      default: "0"
    }
  },
  pointer: {
    score: [String],
    total: {
      type: Number,
      default: 0
    },
    skip: {
      type: String,
      default: "0"
    }
  },
  array: {
    score: [String],
    total: {
      type: Number,
      default: 0
    },
    skip: {
      type: String,
      default: "0"
    }
  },
  classesInheritance: {
    score: [String],
    total: {
      type: Number,
      default: 0
    },
    skip: {
      type: String,
      default: "0"
    }
  },
  polymorphism: {
    score: [String],
    total: {
      type: Number,
      default: 0
    },
    skip: {
      type: String,
      default: "0"
    }
  },
}, { collection: 'Stats' });

module.exports = mongoose.model('Stats',Stats);
