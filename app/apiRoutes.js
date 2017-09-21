const express = require('express');
const jwt = require('jsonwebtoken');
let router = express.Router();
const getQuestion = require('./routes/getQuestion.js');
const addUser = require('./routes/addUser.js');
const authenticate = require('./routes/authenticate.js');
const getUser = require('./routes/getUser.js');
const addQuestion = require('./routes/addQuestion.js');

router.use(function (req, res, next) {
    try {
        req.body = JSON.parse(Object.keys(req.body)[0]);
    } catch (err) {
        req.body = req.body;
    }
    next();
});

router.use(/\/((?!(addUser)|(authenticate)|(addQuestion)).)*/, function (req, res, next) {
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

router.use('/getQuestion',(req, res, next) => {
  var type = req.headers['x-access-type'] || null;
  if(type) {
    req.type = type;
    next();
  } else {
    res.status(400).json({success: false, msg: "Insufficient details"});
  }
});

router.post('/authenticate',authenticate);
router.post('/addUser',addUser);
router.get('/getQuestion',getQuestion);
router.get('/getUser',getUser);
router.post('/addQuestion',addQuestion);

module.exports = router;
