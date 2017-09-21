var User = require('../models/User.js');
var Stats = require('../models/Stats.js')

var addUser = function (req, res) {
    if (!req.body.enrollment || !req.body.password)
        return res.status(400).json({success: false, msg: "Invalid Credentials."});
    else {
        if (req.body.enrollment.length != 11) {
            return res.status(400).json({success: false, msg: "Invalid Credentials."});
        }
        User.find({"enrollment": req.body.enrollment}, function (err, users) {
            if (err) return res.status(400).json({success: false, msg: "Invalid Credentials."});
            if (users.length != 0)
                return res.status(400).json({success: false, msg: "Invalid Credentials."});
            else {
                var user = new User({
                    enrollment: req.body.enrollment,
                    password: req.body.password,
                    email: req.body.email,
                    phone: req.body.phone
                });
                var stats = new Stats({
                  enrollment: req.body.enrollment,
                  // basics: {
                  //   score: "0",
                  //   skip: "0",
                  //   limit: "20"
                  // },
                  // functionOverloading: {
                  //   score: "0",
                  //   skip: "0",
                  //   limit: "20"
                  // },
                  // constructorDestructor: {
                  //   score: "0",
                  //   skip: "0",
                  //   limit: "20"
                  // },
                  // pointer: {
                  //   score: "0",
                  //   skip: "0",
                  //   limit: "20"
                  // },
                  // array: {
                  //   score: "0",
                  //   skip: "0",
                  //   limit: "20"
                  // },
                  // structures: {
                  //   score: "0",
                  //   skip: "0",
                  //   limit: "20"
                  // },
                  // classesInheritance: {
                  //   score: "0",
                  //   skip: "0",
                  //   limit: "20"
                  // }
                });
                stats.save(function (err) {
                    if (err) {
                        return res.status(500).json({success: false, msg: "Unable to create new User."});
                    }
                });
                console.log(user);
                user.save(function (err) {
                    if (err) {
                        return res.status(500).json({success: false, msg: "Unable to create new User."});
                    }
                    return res.status(200).json({success: true, msg: "Data inserted successfully"});
                });
            }
        });
    }
};

module.exports = addUser;
