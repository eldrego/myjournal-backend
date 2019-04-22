import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cards from './Cards';
import { getAllNotes } from '../../actions/noteActions';

export class AllNote extends Component {
  componentDidMount() {
    this.props.getAllNotes();
  }

  render() {
    const { journal: { notes } } = this.props;

    const NoteListing = notes.length > 0 ? <Cards notes={notes}/> : <h4><span>No notes</span></h4>;

    return (
      <Fragment>
        { NoteListing }
      </Fragment>
    );
  }
}

AllNote.propTypes = {
  getAllNotes: PropTypes.func.isRequired,
  journal: PropTypes.object,
};

const mapStateToProps = state => ({
  journal: state.journal,
});

export default connect(mapStateToProps, { getAllNotes })(AllNote);

// render() {
//   const { journal } = this.props;
//   const noteItems = journal.notes.map((note) => {
//     return (
//       <div key={note._id} className="col-md-4">
//         <NoteCard note={note} />
//       </div>
//     );
//   });

//   return (
//     <div className="card-deck">
//       { noteItems }
//     </div>
//   );
// }