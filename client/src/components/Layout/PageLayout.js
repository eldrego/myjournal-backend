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
import UserNotes from '../pages/UserNotes';
import OneNote from '../pages/OneNote';


const PageLayout = (props) => {
  return (
    <div>
      <Header history={props.history}/>
      <main className="container contentContainer">
        <Switch>
          <Route path={`${props.match.path}/`} exact component={Home} />
          <Route path={`${props.match.path}/about`} exact component={About} />
          <Route path={`${props.match.path}/notes`} exact component={UserNotes} />
          <Route path={`${props.match.path}/notes/:noteID`} exact component={OneNote} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

PageLayout.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default PageLayout;


// <Route path={[
//   `${props.match.path}/notes/:noteID`,
//   `${props.match.path}/:noteID`
// ]} exact component={OneNote} />

// <Route path={`${props.match.path}/notes/:noteID`} exact component={OneNote} />
//           <Route path={["/users/:id", "/profile/:id"]} component={User} />
