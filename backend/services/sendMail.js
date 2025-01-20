const nodemailer = require('nodemailer')
const sendMail = async(data)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.MY_EMAIL,
            pass: process.env.EMAIL_APP_PASS
        }
    })

    const mailOption={
        from: "Rijal_Grocery_Strore",
        to: data.email,
        subject: data.subject,
        text: data.text
    }

    await transporter.sendMail(mailOption)

}
module.exports = sendMail;