import React from 'react';
import PropTypes from 'prop-types';
import NoteCard from './NoteCard';

const Cards = (props) => {
  const noteItems = props.notes.map((note) => {
    return (
      <div key={note._id} className="col-md-4">
        <NoteCard note={note} />
      </div>
    );
  });

  return (
    <div className="card-deck">
      { noteItems }
    </div>
  );
};

Cards.propTypes = {
  notes: PropTypes.array,
};

export default Cards;
