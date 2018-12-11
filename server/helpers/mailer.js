import nodemailer from 'nodemailer';
import mailerOptions from '../config/mailerOptions';

const mailer = nodemailer.createTransport(mailerOptions);
// return mailer;

// const mailer = () => {
//
//
//   // client.sendMail(email, (err, info) => {
//   //   if (err) {
//   //     res.status(500).json({
//   //       success: true,
//   //       message: 'An error has occured. Account created but verification email not sent',
//   //       err
//   //     });
//   //   } else {
//   //     // TODO: Modify the response from nodemail to display a user friendly message
//   //     res.status(201).json({
//   //       success: true,
//   //       message: 'User successful created verifcation email sent',
//   //       info
//   //     });
//   //   }
//   // });
// };

export default mailer;
