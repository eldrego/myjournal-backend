import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import randomize from 'randomatic';
import { getAllNotes } from '../../actions/noteActions';
import NoteCard from './NoteCard';

class Notes extends Component {
  componentDidMount() {
    this.props.getAllNotes();
  }

  render() {
    const noteItems = this.props.notes.map((note) => {
      const noteKey = randomize('0', 6);
      return (
        <div key={noteKey} className="col-md-12">
          <NoteCard note={note} />
        </div>
      );
    });

    return (
      <div>
        <div className="row">
          { noteItems }
        </div>
      </div>
    );
  }
}

Notes.propTypes = {
  getAllNotes: PropTypes.func.isRequired,
  notes: PropTypes.array,
};

const mapStateToProps = state => ({
  notes: state.journal.notes,
});

export default connect(mapStateToProps, { getAllNotes })(Notes);
