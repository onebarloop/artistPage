'use strict';
import nodemailer from 'nodemailer';

const mailHost = import.meta.env.EMAIL_HOST;
const mailUser = import.meta.env.EMAIL_USER;
const mailPass = import.meta.env.EMAIL_PASSWORD;

export async function main(recipient, text) {
  // let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: mailHost,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mailUser, // generated ethereal user
      pass: mailPass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: mailUser, // sender address
    to: recipient, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: text, // plain text body
    html: `<b>${text}</b>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
