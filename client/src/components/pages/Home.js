import React, { Component } from 'react';
import AllNotes from './AllNotes';

class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h4 className="userNoteTitle">All Notes</h4>
          <div className="row justify-content-md-center">
            <div className="col-md-12">
              <AllNotes/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
