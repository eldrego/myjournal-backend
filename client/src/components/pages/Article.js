import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import randomize from 'randomatic';
import { fetchArticles } from '../../actions/articleActions';

class Article extends Component {
  componentDidMount() {
    this.props.fetchArticles();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.newArticle) {
      if (this.props.articles !== nextProps.newArticle) {
        this.props.articles.unshift(nextProps.newArticle);
      }
    }
  }

  render() {
    const articleItems = this.props.articles.map((article) => {
      const articleKey = randomize('0', 6);
      return (
        <div key={articleKey}>
          <h6>{article.title}</h6>
          <p>{article.content}</p>
          <hr/>
        </div>
      );
    });

    return (
      <div>
        Article Listing
        { articleItems }
      </div>
    );
  }
}

Article.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.array,
  newArticle: PropTypes.object
};

const mapStateToProps = state => ({
  articles: state.articles.items,
  newArticle: state.articles.item
});

export default connect(mapStateToProps, { fetchArticles })(Article);
