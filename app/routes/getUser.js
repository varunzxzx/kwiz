var User = require('../models/User');

var getUsers = function (req, res) {
    if (req.decoded === false) return res.status(400).json({success: false, msg: "Unauthorized Access"});
    var ern = req.decoded.enrollment;
    User.findOne({"enrollment": ern}, function (err, user) {
        if (err || !user) return res.status(400).json({success: false, msg: "Some error occurred!"});
        user = {
            name: user.name,
            enrollment: user.enrollment,
            email: user.email,
            phone: user.phone,
            course: user.course
        }
        res.status(200).json(user);
    });
};

module.exports = getUsers;