const fs = require("fs");
const nodemailer = require("nodemailer");
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const { EMAIL, EMAIL_PASSWORD } = require('../config/config')

function SendTemplate(to, subject, template, context) {
    return new Promise((resolve, reject) => {
        try {
            const trasnporte = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: EMAIL,
                    pass: EMAIL_PASSWORD
                }
            });
            const handlebarOptions = {
                viewEngine: {
                    extName: ".handlebars",
                    partialsDir: path.resolve('./src/views/'),
                    defaultLayout: false,
                },
                viewPath: path.resolve('./src/views/emailTemplates'),
                extName: ".handlebars",
            };
            trasnporte.use('compile', hbs(handlebarOptions));

            const mailOptions = {
                from: EMAIL,
                to,
                subject,
                template,
                context,
                attachments: [{   
                    filename: 'logo-super-mami.png',
                    path: path.join(__dirname, '../views/emailTemplates/img/logo-super-mami.png'),
                    cid: 'logo'
                }]
            };

            trasnporte.sendMail(mailOptions, (error, info) => {
                if (error) return resolve({ error, info: undefined })
                return resolve({ info, error: undefined })
            });
        } catch (err) {
            return reject(err)
        }
    })
}

module.exports = SendTemplate;