const chaiHttp = require('chai-http');
const chai = require('chai');

const server = require('../../index.js');

const should = chai.should();
chai.use(chaiHttp);

describe('Server', () => {
  it('should return 200 if the server is running', (done) => {
    chai.request(server)
      .get('/')
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.equal('Root - Access endpoints using /api/v1');
        done();
      });
  });

  it('should display a welcome message at the root route', (done) => {
    chai.request(server)
      .get('/api/v1')
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.equal('Welcome to My Journal Application API');
        done();
      });
  });
});
