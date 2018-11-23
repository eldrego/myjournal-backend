import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    document.getElementById('closeModal').click();
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal" data-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade"
          id="exampleModal"
          tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{ this.props.title}</h5>
                <button
                  hidden
                  type="button"
                  id="closeModal"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                { this.props.content }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  content: PropTypes.object,
  title: PropTypes.string
};

export default Modal;

// <div className="modal-footer">
//   <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//   <button type="button" className="btn btn-primary">Save changes</button>
// </div>
