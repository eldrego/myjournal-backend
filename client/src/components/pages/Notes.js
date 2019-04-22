import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserNotes } from '../../actions/noteActions';
import Cards from './Cards';


class Notes extends Component {
  componentDidMount() {
    this.props.getUserNotes();
  }

  componentDidUpdate(nextProps) {
    if (nextProps) {
      if (Object.values(nextProps.newNote).length > 0) {
        if (this.props.userNotes !== nextProps.newNote) {
          this.props.userNotes.unshift(nextProps.newNote);
        }
      }
    }
  }

  render() {
    const { userNotes } = this.props;

    const NoteListing = userNotes.length > 0 ? <Cards notes={userNotes}/> : <h4><span>No notes</span></h4>;

    return (
      <Fragment>
        { NoteListing }
      </Fragment>
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
