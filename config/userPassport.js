import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

// load up the user model
import User from '../models/User';
import secret from './secret';

const userPassport = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = secret;
  // disable underscore for jwt_payload
  // eslint-disable-next-line
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ id: jwt_payload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};

export default userPassport;
