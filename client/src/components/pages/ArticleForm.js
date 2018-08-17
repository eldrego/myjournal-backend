import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Progress from 'react-progressbar';
import FileUploader from 'react-firebase-file-uploader';
import firebase from '../../utils/firebase';
import { addArticle } from '../../actions/articleActions';

class ArticleForm extends Component {
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

    this.props.addArticle(article);
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

  render() {
    let ProgressBar;

    if (this.state.isUploading) {
      ProgressBar = <Progress completed={this.state.progress} />;
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text"
            className="form-control"
            name="title"
            value={this.state.title}
            onChange={this.onTitleChange}/>

          <ContentEditable
            className="contentArea"
            html={this.state.content}
            disabled={false}
            onChange={this.onChange}
          />
          { ProgressBar }
          <hr/>
          { this.state.imageUrl && <img src={this.state.imageUrl} />}
          <hr/>

          <label
            style={{
              backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'
            }}>
            <FontAwesomeIcon icon="user" />
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

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

ArticleForm.propTypes = {
  addArticle: PropTypes.func.isRequired
};

export default connect(null, { addArticle })(ArticleForm);
