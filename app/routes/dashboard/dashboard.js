const Stats = require('../../models/Stats');
const Total = require('../../models/Total');

let dashboard = function (req, res) {
    if (req.decoded === false) return res.status(400).json({success: false, msg: "Unauthorized Access"});
    let ern = req.decoded.enrollment;
    let data = {};
    Stats.findOne({enrollment: ern},(err,stat) => {
      if(err) res.status(400).json({success: false, msg: "Not found"})
      data = {
        progress: stat.prev,
        quesAttempt: stat.quesAttempt,
        quizPlay: stat.quizPlay
      }

      // Overall Progress
      let overall = [];
      stat.basics.total != 0 ? overall.push(stat.basics.total):overall.push(0);
      stat.classesInheritance.total != 0 ? overall.push(stat.classesInheritance.total):overall.push(0);
      stat.functionOverloading.total != 0 ? overall.push(stat.functionOverloading.total):overall.push(0);
      stat.constructorDestructor.total != 0 ? overall.push(stat.constructorDestructor.total):overall.push(0);
      stat.pointer.total != 0 ? overall.push(stat.pointer.total):overall.push(0);
      stat.array.total != 0 ? overall.push(stat.array.total):overall.push(0);
      stat.polymorphism.total != 0 ? overall.push(stat.polymorphism.total):overall.push(0);
      data.overall = overall;

      /* Calculating Rank */
      Stats.find({},(err,stats) => {
        if(err) res.status(400).json({success: false, msg: "Technical error"});
        //console.log(stats);
        let sortedRecord = stats.sort((a,b) => {
          return b.total - a.total;
        });
        data.rank = sortedRecord.findIndex(i => i.enrollment === ern) + 1;
        calcAverage();
      });

      /* Calculating average */
      let calcAverage = () => {
        let statTotal = stat.total;
        let average;
        Total.find({},(err,totals) => {
          if(err) res.status(400).json({success: false, msg: "Technical error"});
          average = parseFloat((statTotal/totals[0].total)*100).toFixed(2);
          data.average = String(average);
          res.status(200).json(data);
        })
      }

    })
};

module.exports = dashboard;
