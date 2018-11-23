import React, { Component } from 'react';
import Notes from './Notes';

class UserNotes extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h4 className="userNoteTitle">My Notes</h4>
          <div className="row justify-content-md-center">
            <div className="col-md-12">
              <Notes/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserNotes;
