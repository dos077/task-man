import firebase from 'firebase/app';
import store from '@/store';

firebase.auth().onAuthStateChanged((firebaseUser) => {
  const actionToDispatch = (firebaseUser == null) ? 'logout' : 'login';
  store.dispatch(`authentication/${actionToDispatch}`, firebaseUser);
});
