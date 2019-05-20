import chaiHttp from 'chai-http';
import chai from 'chai';
import server from '../../index';
import { User } from '../../models/User';
import generateToken from '../../helpers/generateToken';

const should = chai.should();
chai.use(chaiHttp);

const registerDetails = {
  username: 'moe',
  password: 'password',
  email: 'moe@email.com',
  fullname: 'Moe Doe'
};

const loginDetails = {
  username: registerDetails.username,
  password: registerDetails.password
};

describe('Feature', () => {
  before((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });

  describe('Register User', () => {
    it('should return a validation errors when fields are incomplete', (done) => {
      chai.request(server)
        .post('/api/v1/register')
        .send(loginDetails)
        .end((error, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.errors.should.be.a('array');
          res.body.success.should.equal(false);
          res.body.errors.should.be.an('array').that.includes({
            location: 'body',
            param: 'fullname',
            msg: 'Please provide your fullname'
          });
          res.body.errors.should.be.an('array').that.includes({
            location: 'body',
            param: 'email',
            msg: 'Please provide a valid email address'
          });
          done();
        });
    });

    it('should return a success message after creating a new user', (done) => {
      chai.request(server)
        .post('/api/v1/register')
        .send(registerDetails)
        .end((error, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.success.should.equal(true);
          res.body.message.should.equal('User successful created');
          done();
        });
    });

    it('should return an error message is already associated with another account', (done) => {
      chai.request(server)
        .post('/api/v1/register')
        .send(registerDetails)
        .end((error, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.success.should.equal(false);
          res.body.message.should.equal('The email address you have entered is already associated with another account.');
          done();
        });
    });
  });

  describe('User Login', () => {
    it('should return a success message after logging in with valid details', (done) => {
      chai.request(server)
        .post('/api/v1/login')
        .send(loginDetails)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.success.should.equal(true);
          res.body.should.have.property('token');
          res.body.message.should.equal(`${registerDetails.username}, You have successfully logged in.`);
          done();
        });
    });

    it('should return a failure message when using wrong password', (done) => {
      const invalidLoginDetails = {
        username: loginDetails.username,
        password: 'wrongpassword'
      };

      chai.request(server)
        .post('/api/v1/login')
        .send(invalidLoginDetails)
        .end((error, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.success.should.equal(false);
          res.body.message.should.equal('Authentication failed. Wrong password.');
          done();
        });
    });

    it('should return a failure message when user details do not exist', (done) => {
      const fakeUserDetails = {
        username: 'fakemoe',
        password: 'password'
      };

      chai.request(server)
        .post('/api/v1/login')
        .send(fakeUserDetails)
        .end((error, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.success.should.equal(false);
          // res.body.should.have.property('error');
          res.body.message.should.equal('Authentication failed. User not found.');
          done();
        });
    });

    it('should return a validation errors when fields are incomplete', (done) => {
      const missingDetails = {
        password: registerDetails.password
      };

      chai.request(server)
        .post('/api/v1/login')
        .send(missingDetails)
        .end((error, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.errors.should.be.a('array');
          res.body.success.should.equal(false);
          res.body.errors.should.be.an('array').that.includes({
            location: 'body',
            param: 'username',
            msg: 'Please provide your username'
          });
          done();
        });
    });
  });

  describe('User Profile', () => {
    const user = {};
    before(async () => {
      User.create(registerDetails, () => {});
      const res = await chai.request(server)
        .post('/api/v1/login')
        .send(loginDetails);

      user.token = res.body.token;
    });

    it('should return the users profile successfully', () => {
      chai.request(server)
        .get('/api/v1/profile')
        .set('Authorization', user.token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.success.should.equal(true);
          res.body.should.have.property('profile');
          res.body.message.should.equal('Your details have been retrieved.');
          res.body.profile.email.should.equal(registerDetails.email);
          res.body.profile.username.should.equal(loginDetails.username);
        });
    });

    it('should return an error message for a users that does not exist', () => {
      const signature = {
        username: 'fakeUser',
        id: '5c0e89bb48d303ac6dc7bbd3'
      };
  
      const token = generateToken(signature);
      chai.request(server)
        .get('/api/v1/profile')
        .set('Authorization', token)
        .end((error, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.success.should.equal(false);
          res.body.message.should.equal('User details not found.');
        });
    });
  });
});
