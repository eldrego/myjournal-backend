import jwt from 'jsonwebtoken';
import settings from '../config/settings';

const generateToken = (signature) => {
  const token = jwt.sign({
    user: signature,
    iat: Math.floor(Date.now())
  },
  settings.secret,
  { expiresIn: 60 * 60 * 1000 });

  return token;
};

export default generateToken;
