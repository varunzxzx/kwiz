const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
  enrollment: {
      type: String,
      required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
      type: String,
      required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
      type: String,
      required: true
  },
  created_at: {
      type: Date
  },
  updated_at: {
      type: Date
  }
}, { collection: 'Users' });

const salt = parseInt(process.env.SALT_WORK_FACTOR) || 10;
var hash;
User.statics.hashPassword = hash = function (password, cb) {
    bcrypt.genSalt(salt, function (err, salt) {
        if (err) return cb(err);
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) return cb(err);
            cb(false, hash);
        });
    });
};

User.pre('validate', function (next) {
    console.log('inside Save !!');
    var user = this;
    now = new Date();
    user.updated_at = now;
    if (!user.created_at) {
      console.log("creating...");
        user.created_at = now;
    }
    if (!user.isModified('password')) {
      console.log("inside password");
      return next();
    }
    hash(user.password, function (err, hash) {
      console.log("inside hash ");
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

User.pre('findOneAndUpdate', function (next) {
  console.log('findOneAndUpdate !!');
    this.findOneAndUpdate({}, {$set: {updated_at: new Date()}});
    next();
});

User.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User',User);
