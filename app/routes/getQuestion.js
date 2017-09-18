const Question = require('../models/Question');

const getQuestion = (req, res) => {
  Question.find((err,question) => {
    if(err) {
      console.log("error");
      res.json({success: false,msg: "Not found!"})
    }
    res.status(200).json(question);
    //console.log(question);
  })
};

module.exports = getQuestion;
