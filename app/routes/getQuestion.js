const Question = require('../models/Question');
const Stats = require('../models/Stats');

const getQuestion = (req, res) => {
  if (req.decoded === false) return res.status(400).json({success: false, msg: "Unauthorized Access"});
  var type = req.type;
  var limit = parseInt(req.limit);
  Stats.findOne({enrollment: req.decoded.enrollment},(err,stats) => {
    if(err) res.status(400).json({success: false,msg: "Not found!"});
    var skip = parseInt(stats[type].skip);
    Question.find({type: req.type}).skip(skip).limit(limit).select('question op1 op2 op3 op4 code').exec((err,question) => {
      if(err) {
        console.log("error");
        res.status(401).json({success: false,msg: "Not found!"})
      } else {
        res.status(200).json(question);
      }
    });
  });
};

module.exports = getQuestion;
