import React, { Component } from 'react';
import Article from './Article';
import ArticleForm from './ArticleForm';

class Home extends Component {
  render() {
    return (
      <div>
        Home page
        <ArticleForm/>
        <Article/>
      </div>
    );
  }
}

export default Home;
