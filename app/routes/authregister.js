var User = require('../models/User.js');

var authregister = (req,res) => {
  if(!req.body.enrollment) {
    return res.status(400).json({success: false, msg: "Invalid details"})
  } else {
    User.findOne({enrollment: req.body.enrollment}, (err,user) => {
      if(user) {
        return res.status(400).json({success: false, msg: "User already exists"})
      }else {
<<<<<<< HEAD
        nodemailer.createTestAccount((err, account) => {

          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
              host: process.env.E_HOST,
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {

                    user: process.env.EMAIL,
                    pass: process.env.E_PASSWORD,
              }
          });

          // setup email data with unicode symbols
          let mailOptions = {
              from: `"admin" <${process.env.EMAIL}>`, // sender address
              to: user.email, // list of receivers
              subject: 'Kwiz OTP Verification', // Subject line // plain text body
              html: {path: `${process.env.DOMAIN}/api/mailPage?token=${token}`,} // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(400).json({success: false, msg: "Error sending mail"});
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
          });
        });
        let email = user.email;
        String.prototype.replaceAt=function(index, replacement) {
            return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
        }
        const n = email.split("@")[0].length;
        let str = "";
        let i;
        for(i=0;i<n-3;i++) {
          str += "*";
        }
        email = email.replaceAt(0,str);
        res.status(200).json({email: email})
=======
        return res.status(200).json({success: true, msg: "Proceed registration"})
>>>>>>> 8eb766e257ab9b88d7d400a926fc240f4b650938
      }
    })
  }
}

module.exports = authregister;
