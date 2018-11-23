import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { noteConstants } from '../constants';

export const fetchUserNotes = notes => ({
  type: noteConstants.FETCH_USER_NOTES,
  payload: notes
});

export const getUserNotes = () => (dispatch) => {
  axios.defaults.headers.common.Authorization = localStorage.token;
  axios.get('/api/v1/notes')
    .then((response) => {
      dispatch(fetchUserNotes(response.data.notes));
      toastr.success(response.data.message);
    })
    .catch((error) => {
      toastr.error(`Error : ${error.response.data.message}`);
    })
    .then(() => {
    // always executed
    });
};

export const fetchNotes = notes => ({
  type: noteConstants.FETCH_NOTES,
  payload: notes
});

export const getAllNotes = () => (dispatch) => {
  axios.defaults.headers.common.Authorization = localStorage.token;
  axios.get('/api/v1/all-notes')
    .then((response) => {
      dispatch(fetchNotes(response.data.notes));
      toastr.success(response.data.message);
    })
    .catch((error) => {
      toastr.error(`Error : ${error.response.data.message}`);
    })
    .then(() => {
    // always executed
    });
};

export const addNewNote = note => ({
  type: noteConstants.ADD_NOTE,
  payload: note
});

export const addNote = newNote => (dispatch) => {
  axios.defaults.headers.common.Authorization = localStorage.token;
  axios.post('/api/v1/notes', newNote)
    .then((response) => {
      dispatch(addNewNote(response.data.note));
      toastr.success(response.data.message);
    })
    .catch((error) => {
      toastr.error(`Error : ${error.response.data.message}`);
    })
    .then(() => {
    // always executed
    });
};
