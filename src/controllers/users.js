import { validationResult } from 'express-validator/check';
import { User } from '../models/User';
import generateToken from '../helpers/generateToken';
// import mailer from '../helpers/mailer';

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        success: false,
        message: 'An error has occurred',
        errors: errors.array()
      });
    }

    const userExist = await User.findOne({ email: req.body.email });

    if (!userExist) {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
        email: req.body.email
      });
      const savedUser = await newUser.save();
      if (savedUser) {
        res.status(201).json({
          success: true,
          message: 'User successful created',
          user: savedUser,
        });

        // Send an email to the user on successful registration mailer.sendMail(email, (err, info)
      }
    } else {
      res.status(409).json({
        success: false,
        message: 'The email address you have entered is already associated with another account.'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error has occurred',
      error: `${error}`,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        success: false,
        message: 'An error has occurred',
        errors: errors.array()
      });
    }

    const user = await User.findOne(
      { username: req.body.username },
      { role: 0, email: 0 }
    );

    if (!user) {
      res.status(404).send({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!err && isMatch) {
          const signature = {
            username: user.username,
            id: user._id
          };

          const token = generateToken(signature);
          res.status(200).send({
            success: true,
            message: `${user.username}, You have successfully logged in.`,
            token: `${token}`,
            username: user.username
          });
        } else {
          res.status(401).send({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error has occurred',
      error: `${error}`,
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const { user: { id } } = req.decoded;
    const profile = await User.findOne(
      { _id: id },
      { _id: 0, password: 0, __v: 0 }
    );

    if (!profile) {
      res.status(404).send({
        success: false,
        message: 'User details not found.'
      });
    } else {
      res.status(200).send({
        success: true,
        message: 'Your details have been retrieved.',
        profile
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error has occurred',
      error: `${error}`,
    });
  }
};
