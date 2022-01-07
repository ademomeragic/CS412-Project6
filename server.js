const express = require('express');
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ademomeragic15@gmail.com',
            pass: ''
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'ademomeragic15@gmail.com',
        subject: `Message from ${req.bodu.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=> {
        if(error){
            console.log(error);
            res.log(error);
        } else{
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })

})

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})