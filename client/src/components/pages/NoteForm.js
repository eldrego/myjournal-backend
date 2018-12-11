import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageEditor from '../common/PageEditor';
import ImageUploader from '../common/ImageUploader';
import { addNote } from '../../actions/noteActions';
import { getCategories } from '../../actions/categoryActions';

class NoteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      imageUrl: null,
      category: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.imageUploader = this.imageUploader.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
  }

  componentDidMount() {
    this.props.getCategories();
  }

  onTitleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  selectCategory(event) {
    console.log(event.target.value);
  }

  contentChange(content) {
    this.setState({
      content: content.blocks[0].text
    });
  }

  imageUploader(imageUrl) {
    this.setState({ imageUrl });
  }

  onSubmit(event) {
    event.preventDefault();

    const article = {
      title: this.state.title,
      content: this.state.content,
      image: this.state.imageUrl,
    };

    this.props.addNote(article);
    this.setState({
      title: '',
      content: '',
      imageUrl: null,
    });
  }

  render() {
    const { categories } = this.props;

    const optionItems = categories.map((category) => {
      return (
        <option key={category._id} className="col-md-12">
          { category.name }
        </option>
      );
    });

    return (
      <div className="userNote">
        <div className="row">
          <div className="col-md-9">
            <form>
              <input type="text"
                className="form-control"
                name="title"
                autoComplete="off"
                placeholder="Note Title"
                value={this.state.title}
                onChange={this.onTitleChange}/>

              <PageEditor contentHandler={this.contentChange}/>

            </form>
          </div>
          <div className="col-md-3">
            <select
              className="selectBox"
              onChange={this.selectCategory}>
              {optionItems}
            </select>

          </div>
        </div>
        <div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="imageUploader">
                    <ImageUploader
                      uploadHandler={this.imageUploader}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="submitNote">
                  <button
                    type="submit"
                    onClick={this.onSubmit}
                    className="btn btn-primary float-right">Create Note</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NoteForm.propTypes = {
  addNote: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.array,
};

const mapStateToProps = state => ({
  categories: state.category.list,
});

export default connect(mapStateToProps, { addNote, getCategories })(NoteForm);
