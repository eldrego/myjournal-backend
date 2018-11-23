import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import randomize from 'randomatic';
import { getUserNotes } from '../../actions/noteActions';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import Modal from '../common/Modal';

class Notes extends Component {
  componentDidMount() {
    this.props.getUserNotes();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.newNote) {
      if (this.props.userNotes !== nextProps.newNote) {
        this.props.userNotes.unshift(nextProps.newNote);
      }
    }
  }

  render() {
    console.log(this.props, 'Current Props');

    const noteItems = this.props.userNotes.map((note) => {
      const noteKey = randomize('0', 6);
      return (
        <div key={noteKey} className="col-md-3">
          <NoteCard note={note} />
        </div>
      );
    });

    return (
      <div>
        <Modal
          content={<NoteForm />}
          title={'Create Note'}
        />
        Note Listing
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
  userNotes: state.notes.userItems,
  newNote: state.notes.item
});

export default connect(mapStateToProps, { getUserNotes })(Notes);
