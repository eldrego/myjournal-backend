import React from 'react';
import PropTypes from 'prop-types';
// import firebase from '../../utils/firebase';

const NoteCard = (props) => {
  // firebase.auth().signInAnonymously();
  return (
    <div className="card">
      <img className="card-img-top" src={props.note.image} alt="Note image"/>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted text-center">
          {props.note.title}
        </h6>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.object,
};

export default NoteCard;

// <h5 className="card-title">{props.note.title}</h5>
// <p className="card-text text-truncate">{props.note.content}</p>
