import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

export const schema = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'regular'
  },
  verified: {
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: String,
    default: 'http://lorempixel.com/100/100/people/'
  }
};

const UserSchema = new mongoose.Schema(schema);

// eslint-disable-next-line
UserSchema.pre('save', function (next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) {
        return next(saltError);
      }
      bcrypt.hash(user.password, salt, null, (hashError, hash) => {
        if (hashError) {
          return next(hashError);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (userPassword, callback) {
  // eslint-disable-next-line
  bcrypt.compare(userPassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

export const User = mongoose.model('User', UserSchema);
