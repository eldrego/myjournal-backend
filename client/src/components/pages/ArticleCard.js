import React from 'react';
import PropTypes from 'prop-types';

const ArticleCard = (props) => {
  return (
    <div>
      <div>
        <h6>{props.article.title}</h6>
        <p>{props.article.content}</p>
        <hr/>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.object,
};

export default ArticleCard;
