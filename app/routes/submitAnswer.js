const Question = require('../models/Question');
const Stats = require('../models/Stats');

var submitAnswer = (req,res) => {
  if (req.decoded === false) return res.status(400).json({success: false, msg: "Unauthorized Access"});
  if(req.body.answers.length == 2) {
    return res.status(400).json({success: false, msg: "Empty data"})
  } else {
    var type = req.body.type;
    var limit = req.body.limit;
    Stats.findOne({enrollment: req.decoded.enrollment},(err,stats) => {
      if(err) res.status(400).json({success: false,msg: "Not found!"});
      var skip = parseInt(stats[type].skip);
      Question.find({type: req.body.type}).skip(skip).limit(limit).select('crct').exec((err,question) => {
        if(err) {
          console.log("error");
          res.status(401).json({success: false,msg: "Not found!"})
        } else {
          let score = 0;
          for (i=0; i<req.body.answers.length; i++) {
            if(req.body.answers[i] == question[i].crct) {
              score += 1;
            }
          }
          var i;
          var newScores = [];
          for(i=0;i<=3;i++) {
            newScores[i] = stats[type].score[i+1]?stats[type].score[i+1]:"0";
          }
          stats[type].skip = String(skip + 20);
          newScores[4] = String(score);
          stats[type].score = newScores;
          stats.save();
          res.status(200).json(score);
        }
      });
    });
  }
}

module.exports = submitAnswer;
