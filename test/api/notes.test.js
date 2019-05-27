const chaiHttp = require('chai-http');
const chai = require('chai');

const server = require('../../index.js');
const { Note } = require('../../models/Note');
const { User } = require('../../models/User');

const should = chai.should();
chai.use(chaiHttp);

const registerDetails = {
  username: 'moe',
  password: 'password',
  email: 'moe@email.com',
  fullname: 'Moe Doe',
};

const loginDetails = {
  username: 'moe',
  password: 'password',
};

describe('Feature', () => {
  const user = {};
  before(async () => {
    User.create(registerDetails, () => {});
    const res = await chai.request(server)
      .post('/api/v1/login')
      .send(loginDetails);

    user.token = res.body.token;
  });

  before((done) => {
    Note.deleteMany({}, () => {
      done();
    });
  });

  describe('Get All Notes', () => {
    it('should GET all notes', (done) => {
      chai.request(server)
        .get('/api/v1/notes')
        .set('Authorization', user.token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.success.should.equal(true);
          res.body.message.should.equal('success');
          res.body.should.have.property('notes');
          res.body.notes.should.be.a('array');
          res.body.notes.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('Create Note', () => {
    it('should not POST a note without content', (done) => {
      const note = {
        title: 'The Lord of the Rings',
      };

      const errorMessage = 'An error has occurred';

      chai.request(server)
        .post('/api/v1/notes')
        .set('Authorization', user.token)
        .send(note)
        .end((error, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.success.should.equal(false);
          res.body.should.have.property('errors');
          res.body.message.should.equal(errorMessage);
          done();
        });
    });

    it('should successfully POST a note with title, content and category', (done) => {
      const note = {
        title: 'The Lord of the Rings',
        content: 'The Lord of the Rings is a film series directed by Peter Jackson.',
        category: '5c0953ba695bab1e49485a03'
      };

      chai.request(server)
        .post('/api/v1/notes')
        .set('Authorization', user.token)
        .send(note)
        .end((error, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.success.should.equal(true);
          res.body.message.should.equal('success');
          res.body.should.have.property('note');
          res.body.note.title.should.equal('The Lord of the Rings');
          done();
        });
    });

    it('should GET all notes after creating a note successfully', (done) => {
      chai.request(server)
        .get('/api/v1/notes')
        .set('Authorization', user.token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.success.should.equal(true);
          res.body.message.should.equal('success');
          res.body.should.have.property('notes');
          res.body.notes.should.be.a('array');
          res.body.notes.length.should.be.eql(1);
          done();
        });
    });
  });

  describe('Get One Note', () => {
    const note = {};
    before(async () => {
      const res = await chai.request(server).get('/api/v1/notes');
      note.id = res.body.notes[0]._id;
    });

    it('should return details of just one note', (done) => {
      chai.request(server)
        .get(`/api/v1/notes/${note.id}`)
        .set('Authorization', user.token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.success.should.equal(true);
          res.body.message.should.equal('success');
          res.body.should.have.property('note');
          res.body.note._id.should.equal(note.id);
          done();
        });
    });
  });

  after((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });
});
