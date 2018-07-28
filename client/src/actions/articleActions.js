import axios from 'axios';
import { ADD_ARTICLE, FETCH_ARTICLES } from '../constants/actionTypes';

export const fetchAllArticles = articles => ({
  type: FETCH_ARTICLES,
  payload: articles
});

export const fetchArticles = () => (dispatch) => {
  axios.get('/api/v1/articles')
    .then((response) => {
      console.log(response.data.articles);
      dispatch(fetchAllArticles(response.data.articles));
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
    // always executed
    });
};

export const addNewArticle = article => ({
  type: ADD_ARTICLE,
  payload: article
});

export const addArticle = newArticle => (dispatch) => {
  console.log(newArticle);
  axios.post('/api/v1/create', newArticle)
    .then((response) => {
      dispatch(addNewArticle(response.data.article));
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
    // always executed
    });
};
