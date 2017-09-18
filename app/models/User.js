const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
  enrollment: {
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
  reset_token: {
      type: String
  },
  created_at: {
      type: Date
  },
  updated_at: {
      type: Date
  }
}, { collection: 'Users' });

const hashPassword = function (password, cb) {
    bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR), function (err, salt) {
        if (err) return cb(err);
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) return cb(err);
            cb(null, hash);
        });
    });
};

User.pre('save', function (next) {
    console.log('inside Save !!');
    var user = this;
    now = new Date();
    user.updated_at = now;
    if (!user.created_at) {
        user.created_at = now;
    }
    if (!user.isModified('password')) return next();
    hashPassword(user.password, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

User.pre('findOneAndUpdate', function (next) {
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
