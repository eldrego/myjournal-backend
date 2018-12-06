import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import FileUploader from 'react-firebase-file-uploader';
import firebase from '../../utils/firebase';
import { addNote } from '../../actions/noteActions';

class NoteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      image: null,
      imageUrl: null,
      isUploading: false,
      uploadError: null,
      progress: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleImageDelete = this.handleImageDelete.bind(this);
  }

  componentDidMount() {
    firebase.auth().signInAnonymously();
  }

  onTitleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onChange(event) {
    this.setState({
      content: event.target.value
    });
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
      image: null,
    });
  }

  handleUploadStart() {
    this.setState({ isUploading: true, progress: 0 });
  }

  handleProgress(progress) {
    this.setState({ progress });
  }

  handleUploadError(error) {
    this.setState({ isUploading: false });
    this.setState({ uploadError: error });
  }

  handleUploadSuccess(filename) {
    this.setState({ image: filename, progress: 100, isUploading: false });
    firebase.storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({ imageUrl: url });
      });
  }

  handleImageDelete() {
    firebase.storage()
      .ref('images')
      .child(this.state.image)
      .delete()
      .then(() => {
        this.setState({
          image: null,
          imageUrl: null,
        });
      });
  }

  renderUploaded() {
    return (
      <div className="uploadedContent">
        <FontAwesomeIcon icon="trash"
          onClick={this.handleImageDelete}
          className="uplaodDeleteIcon"
          title="Remove Image"
        />
        <div className="uploadedImage" >
          <img className="object-fit_cover" src={this.state.imageUrl} />
        </div>
      </div>
    );
  }

  renderUploader() {
    return (
      <label className="uploadButton">
        <FontAwesomeIcon
          icon="plus"
          title="Upload Image"
        />
        <FileUploader
          hidden
          accept="image/*"
          name="avatar"
          randomizeFilename
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
      </label>
    );
  }

  render() {
    let ProgressBar;

    if (this.state.isUploading) {
      ProgressBar = <progress max="100" value={this.state.progress}>
        <div className="progress-bar">
          <span>Progress: 80%</span>
        </div>
      </progress>;
    }

    const uploadedContent = !this.state.image ? this.renderUploader() : this.renderUploaded();

    return (
      <div className="userNote">

        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.onSubmit}>
              <input type="text"
                className="form-control"
                name="title"
                autoComplete="off"
                placeholder="Note Title"
                value={this.state.title}
                onChange={this.onTitleChange}/>

              <ContentEditable
                className="contentArea form-control"
                html={this.state.content}
                disabled={false}
                onChange={this.onChange}
              />
              { ProgressBar }
            </form>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <div className="uploadContainer">
                  { uploadedContent }
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
  addNote: PropTypes.func.isRequired
};

export default connect(null, { addNote })(NoteForm);
