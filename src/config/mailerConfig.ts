import { MailerOptions } from '@nestjs-modules/mailer';

const mailerConfig: MailerOptions = {
    transport: {
        host: 'smtp.gmail.com',
        auth: {
            // user: process.env.username,
            // pass: process.env.password,
            user: 'omiifajhossanofficial@gmail.com',
            pass: 'hrjv wmar cibj hgic',
        },
    }
};

export default mailerConfig;
