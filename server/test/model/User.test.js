import { expect } from 'chai';
import { User, schema } from '../../models/User';

let user;

describe('User Model', () => {
  describe('Validation', () => {
    before((done) => {
      user = new User();
      done();
    });

    describe('Create new user', () => {
      it('should throw an error if fullname is empty', (done) => {
        user.validate((err) => {
          expect(err.errors.fullname).to.be.an('object');
          expect(err.errors.fullname.message).to.equal('Path `fullname` is required.');
          done();
        });
      });

      it('should throw an error if username is empty', (done) => {
        user.validate((err) => {
          expect(err.errors.username).to.be.an('object');
          expect(err.errors.username.message).to.equal('Path `username` is required.');
          done();
        });
      });

      it('should throw an error if email is empty', (done) => {
        user.validate((err) => {
          expect(err.errors.email).to.be.an('object');
          expect(err.errors.email.message).to.equal('Path `email` is required.');
          done();
        });
      });

      it('should throw an error if password is empty', (done) => {
        user.validate((err) => {
          expect(err.errors.password).to.be.an('object');
          expect(err.errors.password.message).to.equal('Path `password` is required.');
          done();
        });
      });
    });
  });

  describe('Success', () => {
    before((done) => {
      user = new User({
        username: 'moe',
        password: 'password',
        email: 'moe@email.com',
        fullname: 'Moe Doe'
      });
      done();
    });

    after((done) => {
      User.deleteMany({}, () => {
        done();
      });
    });

    it('should successfully create a new user', (done) => {
      user.validate((err) => {
        expect(user.username).to.equal('moe');
        expect(err).to.equal(null);
        done();
      });
    });
  });
});
