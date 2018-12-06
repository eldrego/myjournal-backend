import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class NoteCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      read: false,
    };
  }

  render() {
    const { match, note } = this.props;

    return (
      <div className="card">
        <img className="card-img-top" src={note.image} alt="Note image"/>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted text-center">
            <Link to={`${match.path}/${note._id}`}>{note.title}</Link>
          </h6>
          <p className="card-subtitle mb-2 text-muted text-center">
            {note.content}
          </p>
        </div>
      </div>
    );
  }
}

NoteCard.propTypes = {
  match: PropTypes.object,
  note: PropTypes.object,
};

export default withRouter(NoteCard);
