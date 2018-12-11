import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import FileUploader from 'react-firebase-file-uploader';
import firebase from '../../utils/firebase';

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imageUrl: null,
      isUploading: false,
      uploadError: null,
      progress: 0,
    };

    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleImageDelete = this.handleImageDelete.bind(this);
  }

  componentDidMount() {
    firebase.auth().signInAnonymously();
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
        this.props.uploadHandler(this.state.imageUrl);
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
    let iconDisplay;

    if (this.state.isUploading) {
      iconDisplay = <FontAwesomeIcon
        icon="spinner"
        spin
        title="Upload Image"
      />;
    } else {
      iconDisplay = <FontAwesomeIcon
        icon="plus"
        title="Upload Image"
      />;
    }

    return (
      <label className="uploadButton">
        { iconDisplay }
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
    const uploadedContent = !this.state.image ? this.renderUploader() : this.renderUploaded();
    return (
      <div className="uploadControl">
        <div className="uploadContainer">
          { uploadedContent }
        </div>
      </div>
    );
  }
}

ImageUploader.propTypes = {
  uploadHandler: PropTypes.func.isRequired,
};

export default ImageUploader;
