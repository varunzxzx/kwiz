var User = require('../models/User');

var getUsers = function (req, res) {
    if (req.decoded === false) return res.status(400).json({success: false, msg: "Unauthorized Access"});
    var ern = req.decoded.enrollment;
    User.findOne({"enrollment": ern}, function (err, user) {
        if (err) return res.status(400).json({success: false, msg: "Some error occurred!"});
        res.status(200).json(user);
    });
};

module.exports = getUsers;
