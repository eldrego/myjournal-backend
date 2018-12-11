import { validationResult } from 'express-validator/check';
import { User } from '../models/User';
import generateToken from '../helpers/generateToken';
import mailer from '../helpers/mailer';

const users = {
  register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        success: false,
        message: 'An error has occurred',
        errors: errors.array()
      });
    }

    // Check if another user already exists
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          res.status(400).json({
            success: false,
            message: 'The email address you have entered is already associated with another account.',
          });
        } else {
          // Create new user instance
          const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            fullname: req.body.fullname,
            email: req.body.email
          });

          // save the user
          newUser.save((error) => {
            if (error) {
              res.status(400).json({
                success: false,
                message: 'An error has occurred',
                errors: `${error} - Error`,
              });
            } else {
              const email = {
                from: 'eldrego@yahoo.com',
                to: 'medomwande@gmail.com',
                subject: 'Hello',
                text: 'Hello world',
                html: '<b>Hello world</b>'
              };

              // res.status(201).json({
              //   success: true,
              //   message: 'User successful created'
              // });

              mailer.sendMail(email, (err, info) => {
                if (err) {
                  res.status(500).json({
                    success: true,
                    message: 'An error has occured. Account created but verification email not sent',
                    err
                  });
                } else {
                  // TODO: Modify the response from nodemail to display a user friendly message
                  res.status(201).json({
                    success: true,
                    message: 'User successful created verifcation email sent',
                    info
                  });
                }
              });
            }
          });
        }
      });
  },

  login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'An error has occurred',
        errors: errors.array()
      });
    }

    User.findOne({ username: req.body.username },
      { role: 0, email: 0 })
      .then((user) => {
        // check if password matches
        if (!user) {
          res.status(404).send({
            success: false,
            message: 'Authentication failed. User not found.'
          });
        } else {
          // Check if user has been verified before login

          user.comparePassword(req.body.password, (err, isMatch) => {
            if (!err && isMatch) {
              const signature = {
                username: user.username,
                id: user._id,
              };

              // if user is found and password is right create a token
              const token = generateToken(signature);
              res.status(200).send({
                success: true,
                message: `${user.username}, You have successfully logged in.`,
                token: `${token}`,
              });
            } else {
              res.status(401).send({
                success: false,
                message: 'Authentication failed. Wrong password.'
              });
            }
          });
        }
      }).catch((error) => {
        res.status(404).send({
          success: false,
          message: 'Authentication failed.',
          error: `${error}`
        });
      });
  },

  profile(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'An error has occurred',
        errors: errors.array()
      });
    }

    const { user } = req.decoded;

    User.findOne({ _id: user.id }, { _id: 0, password: 0, __v: 0 })
      .then((profile) => {
        if (!profile) {
          res.status(404).send({
            success: false,
            message: 'User details not found.'
          });
        } else {
          res.status(200).send({
            success: true,
            message: 'Your details have been retrieved.',
            profile,
          });
        }
      }).catch((error) => {
        res.status(400).send({
          success: false,
          message: 'An error has occured.',
          error: `${error}`
        });
      });
  },
};

export default users;
