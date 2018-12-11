
process.env.NODE_ENV = 'test';

const chaiHttp = require('chai-http');
// const sinon = require('sinon');
const chai = require('chai');

const server = require('../../index.js');
const { User } = require('../../models/User');

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

xdescribe('Feature', () => {
  before((done) => {
    User.remove({}, () => {
      done();
    });
  });

  describe('Register User', () => {
    it('should return a success message after creating a new user', (done) => {
      chai.request(server)
        .post('/api/v1/register')
        .send(registerDetails)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.success.should.equal(true);
          res.body.message.should.equal('User successful created');
          done();
        });
    });
  });

  describe('Loging User', () => {
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
  });
});
