const Notification = require('../../models/Notification');
const express = require('express');
const route = express.Router();

route.get("/notification",(req,res) => {
    if (req.decoded === false){
        return res.status(400).json({success: false, msg: "Unauthorized Access"});
    }
    const ern = req.decoded.enrollment;
    let n = 0;
    Notification.find({},(err,notification) => {
        if(err) {
            return res.status(400).json({success: false, msg: "Some error"})
        }
        n = notification.length;
        notification.map(notification => {
            notification.readBy.map(enrollment => {
                if(enrollment = ern) {
                    n -= 1;
                }
            });
        });
        return res.status(200).json({notification,n});
    })
});

route.post("/notification",(req,res) => {
    let notification = new Notification({
        avatar: req.body.avatar,
        description: req.body.description,
        title: req.body.title,
        date: req.body.date,
        brief: req.body.brief,
    })

    notification.save(err => {
        if(err) {
            return res.status(400).json({success: false, msg: "Some error"})
        }
        return res.status(200).json({success: true, msg: "Notification saved"})
    });
});

module.exports = route;