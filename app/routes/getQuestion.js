const Question = require('../models/Question');
const Stats = require('../models/Stats');

const getQuestion = (req, res) => {
  if (req.decoded === false) return res.status(400).json({success: false, msg: "Unauthorized Access"});
  var skip;
  var limit;
  Stats.find({enrollment: req.decoded.enrollment},(err,stats) => {
    if(err) res.status(400).json({success: false,msg: "Not found!"});
    skip = parseInt(stats.skip);
    limit = parseInt(stats.limit);
  });
  Question.find({type: req.type}).skip(skip).limit(limit).exec((err,question) => {
    if(err) {
      console.log("error");
      res.json({success: false,msg: "Not found!"})
    }
    res.status(200).json(question);
    //console.log(question);
  });
};

module.exports = getQuestion;
