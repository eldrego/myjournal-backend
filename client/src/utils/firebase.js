import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDZ_SGiDgtQex8h0wTTCNnc_YKhtBj6WyY',
  authDomain: 'myjournal-4f6ce.firebaseapp.com',
  databaseURL: 'https://myjournal-4f6ce.firebaseio.com',
  projectId: 'myjournal-4f6ce',
  storageBucket: 'myjournal-4f6ce.appspot.com',
  messagingSenderId: '916779041228'
};

firebase.initializeApp(config);

export default firebase;
