import jwt from 'jsonwebtoken';
import settings from '../config/settings';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (typeof token !== 'undefined') {
    jwt.verify(token, settings.secret, (error, decoded) => {
      if (!error) {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      } else {
        return res.send({
          success: false,
          message: `Failed to authenticate token. - ${error}`
        });
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

export default verifyToken;
