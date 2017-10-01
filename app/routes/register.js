var User = require('../models/User.js');
var Stats = require('../models/Stats.js');

var register = (req,res) => {
  if (!req.body.enrollment || !req.body.password || !req.body.token)
      return res.status(400).json({success: false, msg: "Invalid Credentials."});
  else {
    Stats.find({enrollment: req.body.enrollment}, (err,stats) => {
      if(stats.length != 0) {
        res.status(400).json({success: false, msg: "User already registered"})
      } else {
        User.findOne({"enrollment": req.body.enrollment, "reset_token": req.body.token},function (err, user) {
            if (err) {
              return res.status(400).json({success: false, msg: "Invalid Credentials."});
            }
            else {
                var stats = new Stats({
                  enrollment: req.body.enrollment
                });
                stats.save(function (err) {
                    if (err) {
                        return res.status(500).json({success: false, msg: "Unable to create new User"});
                    }
                });
                User.hashPassword(req.body.password, function (err, hash) {
                    if (err) {
                        return res.status(400).json({success: false, msg: "Unable to update password"});
                    }
                    password = hash;
                    User.findOneAndUpdate({
                            "enrollment": req.body.enrollment
                        }, {
                            password: password,
                            reset_token: undefined,
                        },
                        function (err, users) {
                            if (err) {
                                return res.status(400).json({success: false, msg: "Invalid Credentials."});
                            }

                            res.status(200).json({name: users.name});
                        });
                })
                console.log(user);
            }
        });
      }
    })
  }
}

module.exports = register;
