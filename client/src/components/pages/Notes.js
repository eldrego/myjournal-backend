import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import randomize from 'randomatic';
import { getUserNotes } from '../../actions/noteActions';
import NoteCard from './NoteCard';

class Notes extends Component {
  componentDidMount() {
    this.props.getUserNotes();
  }

  componentDidUpdate(nextProps) {
    if (Object.values(nextProps.newNote).length > 0) {
      if (this.props.userNotes !== nextProps.newNote) {
        this.props.userNotes.unshift(nextProps.newNote);
      }
    }
  }

  render() {
    const noteItems = this.props.userNotes.map((note) => {
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
  getUserNotes: PropTypes.func.isRequired,
  userNotes: PropTypes.array,
  newNote: PropTypes.object
};

const mapStateToProps = state => ({
  userNotes: state.journal.userNotes,
  newNote: state.journal.item
});

export default connect(mapStateToProps, { getUserNotes })(Notes);
