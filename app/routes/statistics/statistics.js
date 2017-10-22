const Stats = require('../../models/Stats');
const Total = require('../../models/Total');

let statistics = (req,res) => {
  if (req.decoded === false) return res.status(400).json({success: false, msg: "Unauthorized Access"});
  let ern = req.decoded.enrollment;
  let data = {};
  Stats.findOne({enrollment: ern}, (err,stat) => {
    let type = req.headers['x-access-type'] || null;

    /* Calculating Rank */
    let rank = 0;
    Stats.find({},(err,stats) => {
      if(err) res.status(400).json({success: false, msg: "Technical error"});
      let sortedRecord = stats.sort((a,b) => {
        return a[type].total - b[type].total;
      });
      rank = sortedRecord.findIndex(i => i.enrollment === stat.enrollment);
    });
    data.rank = rank + 1;

    /* Progress */
    data.progress = stat[type].score;

    /* Calculating Average */
    let statTotal = stat[type].total;
    let average;
    Total.find({},(err,totals) => {
      if(err) res.status(400).json({success: false, msg: "Technical error"});
      let total1 = totals[0];
      average = parseFloat((statTotal/parseInt(total1[type]))*100).toFixed(2);
      data.average = String(average);
      res.status(200).json(data);
    })
  })
}

module.exports = statistics;
