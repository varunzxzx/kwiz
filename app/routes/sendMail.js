let OTP = require('../models/OTP.js');
const nodemailer = require('nodemailer');
let sendMail = (req,res) => {
    if (req.decoded === false) return res.status(400).json({success: false, msg: "Unauthorized Access"});
    let email = req.body.email;
    let enrollment = req.body.enrollment;
    let token = Math.floor(Math.random() * 1000000);
    let otp = new OTP({
        enrollment,
        token
    });
    otp.save(err => {
        if(err) {
            return res.status(400).json({success: false,msg: "Some error"})
        }
    })
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
            to: email, // list of receivers
            subject: 'Kwiz OTP Verification', // Subject line // plain text body
            html: {path: `${process.env.DOMAIN}:${process.env.NODE_ENV === "development"?process.env.PORT || 4000:443}/api/mailPage?token=${token}`,} // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(400).json({success: false, msg: "Error sending mail"});
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            return res.status(200).json({success: true, msg: "Email sent successfully"});
        });
    });
}

module.exports = sendMail;