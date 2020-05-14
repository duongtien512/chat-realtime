import nodeMail from 'nodemailer';

let adminEmail = 'duongtieu742@gmail.com';
let adminPassword = 'o8442444o';
let adminHost = 'smtp.gmail.com';
let adminPort = 587;

let sendMail = (to, subject, htmlContent) => {
    let transporter = nodeMail.createTransport({
        host: adminHost,
        port: adminPort,
        secure: false,
        auth: {
            user: adminEmail,
            pass: adminPassword
        }
    });

    let option = {
        from: adminEmail,
        to: to,
        subject: subject,
        html: htmlContent
    };

    return transporter.sendMail(option);
};

module.exports = sendMail;