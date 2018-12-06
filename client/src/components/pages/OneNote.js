import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOneNote } from '../../actions/noteActions';
// import { Link } from 'react-router-dom';

class OneNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oneNote: {}
    };
  }

  componentDidMount() {
    this.props.getOneNote(this.props.match.params.noteID);
  }

  render() {
    return (
      <div>{this.props.oneNote.title}</div>
    );
  }
}

OneNote.propTypes = {
  getOneNote: PropTypes.func.isRequired,
  oneNote: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = state => ({
  oneNote: state.journal.oneNote,
});

export default connect(mapStateToProps, { getOneNote })(OneNote);
