var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

module.exports.sendVerifyMail = ((to,verificationToken) => {


    var mailOptions = {
        from: process.env.EMAIL,
        to: to ,
        subject: 'Sending Email using Node.js',
        text: verificationToken
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
})

// module.exports.ChangePassword = ((to,resetpassword) => {
//     const url = `http://localhost:3006/reset-password/${resetpassword}`
//     var mailOptions = {
//         from: process.env.EMAIL_USERNAME,
//         to: to ,
//         subject: 'Sending Email using Node.js',
//         text: url
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// })