var User = require('../models/User.js');

var authregister = (req,res) => {
  if(!req.body.enrollment) {
    return res.status(400).json({success: false, msg: "Invalid details"})
  } else {
    User.findOne({enrollment: req.body.enrollment}, (err,user) => {
      if(user) {
        return res.status(400).json({success: false, msg: "User already exists"})
      }else {
        return res.status(200).json({success: true, msg: "Proceed registration"})
      }
    })
  }
}

module.exports = authregister;
