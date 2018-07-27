import jwt from 'jsonwebtoken';
import User from '../models/User';
import settings from '../config/settings';

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
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else {
      // check if password matches
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
          // if user is found and password is right create a token
            const token = jwt.sign(user.toString(), settings.secret);
            // return the information including token as JSON
            res.json({
              success: true,
              token: `JWT_${token}`
            });
          } else {
            res.status(401).send({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          }
        });
      }
    });
  },
};

export default users;
