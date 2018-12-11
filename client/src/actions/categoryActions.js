import axios from 'axios';
import { categoryConstants } from '../constants';

export const fetchCategories = categories => ({
  type: categoryConstants.FETCH_CATEGORIES,
  payload: categories
});

export const getCategories = () => (dispatch) => {
  axios.defaults.headers.common.Authorization = localStorage.token;
  axios.get('/api/v1/categories')
    .then((response) => {
      dispatch(fetchCategories(response.data.categories));
      // toastr.success(response.data.message);
    })
    .catch((error) => {
      // toastr.error(`Error : ${error.response.data.message}`);
    });
};
