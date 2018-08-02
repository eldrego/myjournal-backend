import axios from 'axios';
import { ADD_ARTICLE, FETCH_ARTICLES } from '../constants/actionTypes';

export const fetchAllArticles = articles => ({
  type: FETCH_ARTICLES,
  payload: articles
});

export const fetchArticles = () => (dispatch) => {
  axios.defaults.headers.common.Authorization = localStorage.token;
  axios.get('/api/v1/articles')
    .then((response) => {
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
  axios.defaults.headers.common.Authorization = localStorage.token;
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
