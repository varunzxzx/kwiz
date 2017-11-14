let User = require('../models/User.js');
let OTP = require('../models/OTP.js');
let Stats = require('../models/Stats.js');

let register = (req,res) => {
  if (!req.body.enrollment || !req.body.token)
      return res.status(400).json({success: false, msg: "Invalid Credentials."});
  else {
    OTP.findOne({enrollment: req.body.enrollment, token: req.body.token}, (err,otp) => {
        if(err || !otp) {
            return res.status(400).json({success: false, msg: "Some error"})
        }
        let stats = new Stats({
            enrollment: req.body.enrollment
        });
        stats.save((err) => {
            if (err) {
                return res.status(500).json({success: false, msg: "Unable to create new User"});
            }
        });
        let user = new User({
            name: req.body.name,
            enrollment: req.body.enrollment,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone
        })
        user.save(err => {
            if (err) {
                return res.status(500).json({success: false, msg: "Unable to create new User"});
            }
            return res.status(200).json({name: user.name})
        })
        console.log(user);
    })
  }
}

module.exports = register;
