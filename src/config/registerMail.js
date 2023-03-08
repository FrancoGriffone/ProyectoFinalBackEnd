import { createTransport } from 'nodemailer';

const transporter = createTransport({
    service: "gmail",
    port: 587, 
    auth: {
        user: process.env.TEST_MAIL, 
        pass: process.env.PASS_APP
    } 
});

const mailOptions = {
    from: 'Servidor Node.js',
    to: process.env.TEST_MAIL,
    subject: 'Nuevo registro',
    html: '<h1>Te notificamos que existe un nuevo registro en la base de datos. Compruebalo en el servidor de Mongo Atlas</h1>'
}

try {
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
} catch (error) {
    console.log(err)
}

