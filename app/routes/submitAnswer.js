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
          let total = stats.total;
          /* Caluculating the score of quiz type */
          for (i=0; i<req.body.answers.length; i++) {
            if(req.body.answers[i] == question[i].crct) {
              score += 1;
            }
          }
          total += score;
          stats.total = total; //Assigning total of whole
          var i;
          var newScores = [];
          var newPrev = [];
          /* Passing the total in the array of whole and the quiz type */
          for(i=0;i<=3;i++) {
            newScores[i] = stats[type].score[i+1]?stats[type].score[i+1]:"0";
            newPrev[i] = stats.prev[i+1]?stats.prev[i+1]:"0";
          }
          stats[type].skip = String(skip + req.body.answers.length);
          newPrev[4] = newScores[4] = score;
          stats[type].score = newScores;
          stats.prev = newPrev;
          /* Incrementing the total of quiz type */
          let totalScore = stats[type].total;
          totalScore += score;
          stats[type].total = totalScore;

          /* Incrementing Questions Attempted */
          stats.quesAttempt += question.length;

          /* Incrementing Quiz Play */
          stats.quizPlay += 1;

          stats.save();
          res.status(200).json(score);
        }
      });
    });
  }
}

module.exports = submitAnswer;
