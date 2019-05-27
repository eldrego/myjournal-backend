require('dotenv').config();

export default {
  secret: process.env.JWT_SECRET || 'yourSecretCode'
};
