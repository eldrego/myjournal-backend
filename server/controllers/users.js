// import jwt from 'jsonwebtoken';
import User from '../models/User';
import generateToken from '../helpers/generateToken';

const users = {
  register(req, res) {
    if (!req.body.username || !req.body.password) {
      res.send({
        success: false,
        message: 'Please pass username and password'
      });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
        email: req.body.email
      });
        // save the user
      newUser.save((err) => {
        if (err) {
          return res.json({
            success: false,
            message: `${err} - Error`
          });
        }
        res.json({
          success: true,
          message: 'User successful created'
        });
      });
    }
  },

  login(req, res) {
    User.findOne({ username: req.body.username }).then((user) => {
      // check if password matches
      if (!user) {
        res.status(200).send({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const signature = {
            username: user.username,
            id: user._id,
          };

          // if user is found and password is right create a token
          const token = generateToken(signature);

          res.json({
            success: true,
            message: 'User Logged in successfully.',
            token: `${token}`
          });
        } else {
          res.status(200).send({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        }
      });
    }).catch((error) => {
      res.status(404).send({
        success: false, message: 'failure', error
      });
    });
  },

  validateUser(req, res) {
    res.status(200).send({
      success: false,
      message: 'Validate will work here.'
    });
  },
};

export default users;
