const express = require('express');
const jwt = require('jsonwebtoken');
let router = express.Router();
const sendMail = require('./routes/sendMail.js');
const getQuestion = require('./routes/getQuestion.js');
const addUser = require('./routes/addUser.js');
const authenticate = require('./routes/authenticate.js');
const getUser = require('./routes/getUser.js');
const addQuestion = require('./routes/addQuestion.js');
const submitAnswer = require('./routes/submitAnswer.js');
const register = require('./routes/register.js');
const authregister = require('./routes/authregister.js');
const mailPage = require('./routes/mailPage.js');
const dashboard = require('./routes/dashboard/dashboard.js');
const statistics = require('./routes/statistics/statistics.js');
const resources = require('./routes/resources/resources.js');
const leaderboard = require('./routes/leaderboard/leaderboard.js');
const notification = require('./routes/notification/notification.js');
const readNotification = require('./routes/notification/readNotification.js');
const feedback = require('./routes/feedback/feedback.js');

router.use(function (req, res, next) {
    try {
        req.body = JSON.parse(Object.keys(req.body)[0]);
    } catch (err) {
        req.body = req.body;
    }
    next();
});

router.post('/sendMail',sendMail);

router.use(/\/((?!(addUser)|(authenticate)|(mailPage)|(addQuestion)|(register)|(authregister)).)*/, function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || null;
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
            if (err) req.decoded = false;
            else {
              req.decoded = decoded.data;
            }
            next();
        })
    }
    else {
        res.status(400).json({success: false, msg: "Unauthorized Access"});
    }
});
router.get('/notification',notification);
router.post('/notification',notification);
router.post('/readNotification',readNotification);

router.use('/getQuestion',(req, res, next) => {
  var type = req.headers['x-access-type'] || null;
  var limit = req.headers['x-access-limit'] || null;
  if(type) {
    req.type = type;
    req.limit = limit;
    next();
  } else {
    res.status(400).json({success: false, msg: "Insufficient details"});
  }
});

router.post('/authenticate',authenticate);
router.post('/addUser',addUser);
router.get('/getQuestion',getQuestion);
router.get('/getUser',getUser);
router.get('/mailPage',mailPage);
router.post('/addQuestion',addQuestion);
router.post('/submitAnswer',submitAnswer);
router.post('/register',register);
router.post('/authregister',authregister);
router.post('/feedback',feedback);

router.get('/dashboard',dashboard);
router.get('/statistics',statistics);
router.get('/resources',resources);
router.get('/leaderboard',leaderboard);

module.exports = router;
