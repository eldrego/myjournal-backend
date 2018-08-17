import React, { Component } from 'react';
import Article from './Article';
import ArticleForm from './ArticleForm';

class UserNotes extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h4>User Notes page</h4>
          <div className="row justify-content-md-center">
            <div className="col-md-7">
              <ArticleForm/>
              <hr/>
              <Article/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserNotes;
