import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../common/Header';
import Footer from '../common/Footer';

class PageLayout extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className="container">{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}

PageLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default PageLayout;
