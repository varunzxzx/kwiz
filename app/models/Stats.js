const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stats = new Schema({
  enrollment: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    default: 0
  },
  prev: {
    type: [Number]
  },
  quesAttempt: {
    type: Number,
    default: 0
  },
  quizPlay: {
    type: Number,
    default: 0
  },
  basics: {
    score: [Number],
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
    score: [Number],
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
    score: [Number],
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
    score: [Number],
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
    score: [Number],
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
    score: [Number],
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
    score: [Number],
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
