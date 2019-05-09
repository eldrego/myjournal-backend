import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header';
import Footer from '../common/Footer';

const PageLayout = (props) => {
  return (
    <Fragment>
      <Header history={props.history}/>
      <main className="container contentContainer">
        { props.children }
      </main>
      <Footer />
    </Fragment>
  );
};

PageLayout.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  children: PropTypes.object
};

export default PageLayout;
