import firebase from 'firebase/app';

let asyncFirestore = null;

// Lazy load firestore with async import is important for performance

export default () => {
  if (asyncFirestore == null) {
    asyncFirestore = import(/* webpackChunkName: "chunk-firestore" */ 'firebase/firestore').then(
      () => {
        firebase.firestore().settings({});
        firebase.firestore().enablePersistence({ synchronizeTabs: true });
        return firebase.firestore();
      },
    );
  }
  return asyncFirestore;
};
