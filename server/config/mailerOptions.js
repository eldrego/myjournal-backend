let options = {};

if (process.env.NODE_ENV === 'prod') {
  options = {
    service: 'Gmail',
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD
    }
  };
} else {
  options = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.SENDMAIL_USERNAME_TEST,
      pass: process.env.SENDMAIL_PASSWORD_TEST
    }
  };
}

export default options;
