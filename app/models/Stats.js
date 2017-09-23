const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stats = new Schema({
  enrollment: {
    type: String,
    required: true
  },
  basics: {
    score: {
      type: String,
      default: "0"
    },
    skip: {
      type: String,
      default: "0"
    },
    limit: {
      type: String,
      default: "20"
    }
  },
  functionOverloading: {
    score: {
      type: String,
      default: "0"
    },
    skip: {
      type: String,
      default: "0"
    },
    limit: {
      type: String,
      default: "20"
    }
  },
  constructorDestructor: {
    score: {
      type: String,
      default: "0"
    },
    skip: {
      type: String,
      default: "0"
    },
    limit: {
      type: String,
      default: "20"
    }
  },
  pointer: {
    score: {
      type: String,
      default: "0"
    },
    skip: {
      type: String,
      default: "0"
    },
    limit: {
      type: String,
      default: "20"
    }
  },
  array: {
    score: {
      type: String,
      default: "0"
    },
    skip: {
      type: String,
      default: "0"
    },
    limit: {
      type: String,
      default: "20"
    }
  },
  classesInheritance: {
    score: {
      type: String,
      default: "0"
    },
    skip: {
      type: String,
      default: "0"
    },
    limit: {
      type: String,
      default: "20"
    }
  },
  polymorphism: {
    score: {
      type: String,
      default: "0"
    },
    skip: {
      type: String,
      default: "0"
    },
    limit: {
      type: String,
      default: "20"
    }
  },
}, { collection: 'Stats' });

module.exports = mongoose.model('Stats',Stats);
