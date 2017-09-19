var User = require('../models/User.js');

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
