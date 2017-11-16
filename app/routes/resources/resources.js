const Question = require('../../models/Question');
const Stats = require('../../models/Stats');

const getResources = (req, res) => {
  if (req.decoded === false){
      return res.status(400).json({success: false, msg: "Unauthorized Access"});
  }
  var type = req.headers['x-access-type'];
  console.log("req.type: " + type);
  Stats.findOne({enrollment: req.decoded.enrollment},(err,stats) => {
    if(err){
        return res.status(400).json({success: false,msg: "Not found!"});
    }
    if(stats[type].skip !== "0") {
        Question.find({type: type}).limit(parseInt(stats[type].skip)).select('question op1 op2 op3 op4 crct').exec((err, question) => {
            if (err) {
                return res.status(401).json({success: false, msg: "Not found!"})
            } else {
                return res.status(200).json(question);
            }
        });
    } else {
        return res.status(401).json({success: false,msg: "Not found!"})
    }
  });
};

module.exports = getResources;
