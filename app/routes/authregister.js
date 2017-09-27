var User = require('../models/User.js');

var authregister = (req,res) => {
  if(!req.body.enrollment) {
    res.status(400).json({success: false, msg: "Invalid details"})
  } else {
    let token = Math.round(Math.random() * 1000000);
    User.findOneAndUpdate({enrollment: req.body.enrollment},{reset_token: token} , (err,user) => {
      if(err) {
        res.status(400).json({success: false, msg: "Invaid details."})
      }else {
        res.status(200).json({success: true, msg: "Successful!!"})
      }
    })
  }
}

module.exports = authregister;
