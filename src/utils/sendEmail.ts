import * as nodemailer from "nodemailer";

export default async function sendMail({ emailTo, subject, text, html = '' }) {

  try{

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS
       }
      });


    await transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to: emailTo, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body,
    });

    return { success: true }

}catch(e){
    return { success: false, message: e.message }
}

}
