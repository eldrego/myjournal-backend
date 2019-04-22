import React from 'react';
import AllNotes from './AllNotes';

const Home = () => {
  return (
    <div className="col-md-12">
      <h4 className="userNoteTitle">All Notes</h4>
      <div className="row justify-content-md-center">
        <div className="col-md-12">
          <AllNotes />
        </div>
      </div>
    </div>
  );
};

export default Home;
