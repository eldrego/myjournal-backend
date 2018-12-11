import React from 'react';
import PropTypes from 'prop-types';


const Alert = (props) => {
  return (
    <div>
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        { props.message }
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>;
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string
};

export default Alert;
