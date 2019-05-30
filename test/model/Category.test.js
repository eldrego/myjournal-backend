import { expect } from 'chai';
import { Category } from '../../src/models/Category';

let category;

describe('Category Model', () => {
  describe('Validation', () => {
    before((done) => {
      category = new Category();
      done();
    });

    describe('Create new category', () => {
      it('should throw an error if category name is not provided', (done) => {
        category.validate((err) => {
          expect(err.errors.name).to.be.an('object');
          expect(err.errors.name.message).to.equal('Path `name` is required.');
          done();
        });
      });
    });
  });

  describe('Success', () => {
    before((done) => {
      category = new Category({
        name: 'New Category',
      });
      done();
    });

    after((done) => {
      Category.deleteMany({}, () => {
        done();
      });
    });

    it('should successfully create a new category', (done) => {
      category.validate((err) => {
        expect(category.name).to.equal('New Category');
        expect(err).to.equal(null);
        done();
      });
    });
  });
});
