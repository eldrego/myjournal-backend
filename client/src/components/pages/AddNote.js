import React, { Component } from 'react';
import NoteForm from './NoteForm';

class AddNote extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h4 className="userNoteTitle">Create New Note</h4>
          <div className="row">
            <div className="col-md-12">
              <NoteForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddNote;
