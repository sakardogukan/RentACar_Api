"use strict"
/* -------------------- SEND MAIL ----------------- */
// node i nodemailer
// sendMail(to:string, subject:string, message:string):

const nodemailer = require('nodemailer')

module.exports = function (to, subject, message) {

    //return true //! bu satır mail gönderilmesini engeller

    //? Create test (fake) Account:
    // console.log(nodemailer)
    // nodemailer.createTestAccount().then((email) => console.log(email))
    /*
    {
        user: 'myibwbtihdk4lnss@ethereal.email',
        pass: 'nTNXMxgUUSE7xZh4VM',
        smtp: { host: 'smtp.ethereal.email', port: 587, secure: false }, // mail transmitter
        imap: { host: 'imap.ethereal.email', port: 993, secure: true }, // mail receive
        pop3: { host: 'pop3.ethereal.email', port: 995, secure: true }, // mail receive
        web: 'https://ethereal.email'
    }
    */
    /* ------------------------------------------------ *
    //? Connection to mailServer:
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // false | 'tls' | 'ssl'
        auth: {
            user: 'myibwbtihdk4lnss@ethereal.email',
            pass: 'nTNXMxgUUSE7xZh4VM'
        }
    })
    
    //? SendMail:
    transporter.sendMail({
        from: 'myibwbtihdk4lnss@ethereal.email',
        to: 'sakardogukan@gmail.com',
        subject: 'Hello',
        text: 'Hello There...',
        html: '<b>Hello There</b>'
    }, (error, successInfo)=> {
        if(error) console.log(error)
        else console.log(successInfo)
    })
    /* ------------------------------------------------ */

    //? GoogleMail (gmail):

    const mailSettings = {
        service: 'Gmail',
        user: 'test.060634@gmail.com',
        pass: 'rlgl kqat eech kkhu' // app password
    }

    const emailContent = {
        from: mailSettings.user,
        to: to, // 'sakardogukan@gmail.com',
        subject: subject, //'Hello',
        html: message //'<b>Hello</b> How are you?'
    }

    //? Connect to mail Server:
    const transporter = nodemailer.createTransport({
        service: mailSettings.service,
        auth: {
            user: mailSettings.user,
            pass: mailSettings.pass
        }
    })
    //? Send Mail:
    transporter.sendMail(emailContent, (error, info) => {
        error ? console.log(error) : console.log(info)
    })

}