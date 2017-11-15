const Stats = require('../../models/Stats');
const User = require('../../models/User');

const getLeaderboard = (req,res) => {
  if (req.decoded === false) return res.status(400).json({success: false, msg: "Unauthorized Access"});
  Stats.find({}, (err,stats) => {
    const data = []
    if(err) res.status(400).json({success: false, msg: "Technical error"});
    let sortedRecord = stats.sort((a,b) => {
      return b.total - a.total;
    });
    asyncLoop(0,() => {
      res.status(200).json({stats: data})
    })

    function asyncLoop(i, callback) {
      if(i<10) {
        User.findOne({enrollment: sortedRecord[i].enrollment}, (err,user) => {
          data[i] = {
            name: user.name,
            total: sortedRecord[i].total,
            quizPlay: sortedRecord[i].quizPlay,
            enrollment: sortedRecord[i].enrollment
          }
          asyncLoop(i+1, callback);
        })
      } else {
        callback();
      }
    }
  })
}

module.exports = getLeaderboard;
