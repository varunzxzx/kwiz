const Stats = require('../../models/Stats');
const Total = require('../../models/Total');

let statistics = (req,res) => {
  if (req.decoded === false) return res.status(400).json({success: false, msg: "Unauthorized Access"});
  let ern = req.decoded.enrollment;
  let data = {};
  Stats.findOne({enrollment: ern}, (err,stat) => {
    let type = req.headers['x-access-type'] || null;

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
      calcRank();
    })

    /* Calculating Rank */
    let calcRank = () => {
      Stats.find({},(err,stats) => {
        if(err) res.status(400).json({success: false, msg: "Technical error"});
        let sortedRecord = stats.sort((a,b) => {
          return b[type].total - a[type].total;
        });
        data.rank = sortedRecord.findIndex(i => i.enrollment === ern) + 1;
        res.status(200).json(data);
      });
    }
  })
}

module.exports = statistics;
