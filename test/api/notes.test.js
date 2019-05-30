import decode from 'jwt-decode';
const chaiHttp = require('chai-http');
const chai = require('chai');

const server = require('../../src/index.js');
const { Note } = require('../../src/models/Note');
const { User } = require('../../src/models/User');

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

    it('should propmt for a category when absent from note details', (done) => {
      const note = {
        title: 'The Lord of the Roads',
        content: 'The Lord of the Roads is NOT a film series directed by Peter Jackson.',
        category: ''
      };

      chai.request(server)
        .post('/api/v1/notes')
        .set('Authorization', user.token)
        .send(note)
        .end((error, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.success.should.equal(false);
          res.body.message.should.equal('An error has occurred');
          res.body.should.have.property('errors');
          res.body.errors[0].msg.should.equal('Please provide the identifier for the category in the database');
          done();
        });
    });

    xit('should not be able to create another note with the same title', (done) => {
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
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.success.should.equal(false);
          res.body.message.should.equal('An error has occurred');
          res.body.should.have.property('error');
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

    it('should return an error when note does not exist', (done) => {
      const fakeNoteID = '5c0953ba695bab1e49485a03';
      chai.request(server)
        .get(`/api/v1/notes/${fakeNoteID}`)
        .set('Authorization', user.token)
        .end((error, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.success.should.equal(false);
          res.body.message.should.equal('Record not found');
          done();
        });
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

  describe('Get User Notes', () => {
    it('should return the users created notes', (done) => {
      const { user: { id } } = decode(user.token);
      chai.request(server)
        .get('/api/v1/user-notes')
        .set('Authorization', user.token)
        .send(id)
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

  describe('Update User Notes', () => {
    it('should update users created notes successfully', (done) => {
      const { user: { id } } = decode(user.token);
      chai.request(server)
        .get('/api/v1/user-notes')
        .set('Authorization', user.token)
        .send(id)
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

  after((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });
});
