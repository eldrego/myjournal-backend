process.env.NODE_ENV = 'test';

const chaiHttp = require('chai-http');
// const sinon = require('sinon');
const chai = require('chai');

const server = require('../index.js');
const Article = require('../models/Article');

const should = chai.should();
chai.use(chaiHttp);

// const testData = require('../fixtures/testData.json');

describe('Article Controller', () => {
  beforeEach((done) => {
    Article.remove({}, () => {
      done();
    });
  });

  describe('/GET Articles', () => {
    it('it should GET all articles', (done) => {
      chai.request(server)
        .get('/api/v1/articles')
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.success.should.equal(true);
          res.body.message.should.equal('success');
          res.body.should.have.property('articles');
          res.body.articles.should.be.a('array');
          res.body.articles.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST Article', () => {
    it('it should not POST an article without content', (done) => {
      const article = {
        title: 'The Lord of the Rings',
      };

      const errorMessage = 'Articles validation failed: content: Path `content` is required.';

      chai.request(server)
        .post('/api/v1/create')
        .send(article)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.success.should.equal(false);
          res.body.should.have.property('error');
          res.body.error.message.should.equal(errorMessage);
          done();
        });
    });

    it('it should successfully POST an article with title and content', (done) => {
      const article = {
        title: 'The Lord of the Rings',
        content: 'The Lord of the Rings is a film series directed by Peter Jackson.',
      };

      chai.request(server)
        .post('/api/v1/create')
        .send(article)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.success.should.equal(true);
          res.body.message.should.equal('success');
          res.body.should.have.property('article');
          res.body.article.title.should.equal('The Lord of the Rings');
          done();
        });
    });
  });
});
