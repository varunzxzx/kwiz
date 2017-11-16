const nodemailer = require('nodemailer');

let feedback = (req,res) => {
    if (req.decoded === false){
        return res.status(400).json({success: false, msg: "Unauthorized Access"});
    }
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
            from: `${req.body.name} <${process.env.EMAIL}>`, // sender address
            to: "varun995862@gmail.com", // list of receivers
            subject: 'Kwiz Feedback', // Subject line // plain text body
            html: `<ul><li>Name: ${req.body.name}</li><li>Enrollment: ${req.body.enrollment}</li><li>Email: ${req.body.email}</li></ul><div>${req.body.message}</div>` // html body
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

module.exports = feedback;