const nodemailer = require('nodemailer');
const sendEmails = (emaill, data) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 3000,
        secure: true,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.MY_EMAIL,
        to: emaill,
        subject: "Todays Schedule",
        text: data.length === 0 ? `Dear Student,

No class Today.

Best regards,
Timetable Manager`: `Dear Student,

We would like to provide you with your class schedule for today:
        
Class Name: ${data}
        
Please make sure to attend your classes on time. If you have any questions or need further information, please do not hesitate to contact us.
        
Best regards,
Timetable Manager
        `
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        }
        else {
            console.log(`Email sent ` + info.response)
        }
    });
}
module.exports = sendEmails;
