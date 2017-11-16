const Notification = require('../../models/Notification');

let readNotification = (req,res) => {
    if (req.decoded === false){
        return res.status(400).json({success: false, msg: "Unauthorized Access"});
    }
    const ern = req.decoded.enrollment;
    Notification.findById(req.body.id,(err,notification) => {
        if(err) {
            return res.status(400).json({success: false, msg: "Some error"})
        }
        let tempReadBy = notification.readBy || [];
        let flag = false;
        for(let i=0; i<tempReadBy; i++) {
            if(notification.readBy[i] === ern) {
                flag = true;
                break;
            }
        }
        if(!flag) {
            tempReadBy.push(ern);
            notification.readBy= tempReadBy;
            notification.save((err, notification) => {
                if (err) {
                    return res.status(400).json({success: false, msg: "Unauthorized Access"});
                }
                return res.status(200).json({success: true, msg: "Done!"});
            });
        }
    })
}

module.exports = readNotification;