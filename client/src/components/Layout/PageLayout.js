import React from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header';
import Footer from '../common/Footer';

const PageLayout = (props) => {
  return (
    <div>
      <Header history={props.history}/>
      <main className="container contentContainer">
        { props.children }
      </main>
      <Footer />
    </div>
  );
};

PageLayout.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  children: PropTypes.object
};

export default PageLayout;

// <Switch>
//   <Route path={`${props.match.path}/`} exact component={Home} />
//   <Route path={`${props.match.path}/create-note`} exact component={AddNote} />
//   <Route path={`${props.match.path}/notes`} exact component={UserNotes} />
//   <Route path={`${props.match.path}/notes/:noteID`} exact component={OneNote} />
// </Switch>
