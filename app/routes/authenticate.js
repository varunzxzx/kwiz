var jwt = require('jsonwebtoken');

var User = require('../models/User');

var authenticate = function (req, res) {
    User.findOne({"enrollment": req.body.enrollment}, function (err, user) {
        if (err) return res.status(500).json({"success": false, msg: "Something Crashed"});
        else {
            if (!user) return res.status(400).json({"success": false, msg: "Authentication failed"});
            else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (err) return res.status(400).json({"success": false, msg: "Authentication failed"});
                    else {
                        if (!isMatch) return res.status(400).json({"success": false, msg: "Authentication failed"});
                        var token = jwt.sign({data: user}, process.env.TOKEN_KEY, {
                            expiresIn: 60 * 60 * 24 * 7
                        });
                        return res.status(200).json({
                            success: true,
                            msg: "Authenticated. Token valid till 7 days",
                            token: token
                        });
                    }
                })
            }
        }
    });
};

module.exports = authenticate;
