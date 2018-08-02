import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch
} from 'react-router-dom';

import Header from '../common/Header';
import Footer from '../common/Footer';
import Home from '../pages/Home';
import About from '../pages/About';

const PageLayout = (props) => {
  return (
    <div>
      <Header />
      <main className="container">
        <Switch>
          <Route path={`${props.match.path}/`} exact component={Home} />
          <Route path={`${props.match.path}/about`} component={About} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

PageLayout.propTypes = {
  match: PropTypes.object,
};

export default PageLayout;
