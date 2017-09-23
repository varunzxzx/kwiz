var Question = require('../models/Question.js');
var Total = require('../models/Total.js');

var addQuestion = (req,res) => {
  if (!req.body.question || !req.body.op1 || !req.body.op2 || !req.body.op3 || !req.body.op4 || !req.body.crct || !req.body.type) {
    return res.status(400).json({success: false,msg: "Insufficient details"})
  } else {
    Question.find({"op1": req.body.op1}, function (err, questions) {
        if (err) return res.status(400).json({success: false, msg: "Invalid detail"});
        if (questions.length != 0)
            return res.status(400).json({success: false, msg: "Invalid Credentials."});
        else {
            var question = new Question({
                question: req.body.question,
                op1: req.body.op1,
                op2: req.body.op2,
                op3: req.body.op3,
                op4: req.body.op4,
                crct: req.body.crct,
                type: req.body.type,
                code: req.body.code
            });
            question.save(function (err) {
                if (err)
                    return res.status(500).json({success: false, msg: "Unable to create Question"});
                var type = req.body.type;
                var count = 0;
                Total.find({},(err,total) => {
                  if(err) return res.status(400).json({success: false, msg: "Total not found"});
                  count = parseInt(total[0][type]);
                  count = count + 1;
                  Total.findOneAndUpdate({}, {[type]: String(count)},(err,doc) => {
                    if(err) return res.status(400).json({success: false, msg: "Cannot modify total"});
                  });
                });
                return res.status(200).json({success: true, msg: "Data inserted successfully"});
            });
        }
    });
  }
}

module.exports = addQuestion;
