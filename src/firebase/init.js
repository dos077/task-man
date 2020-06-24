
import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.VUE_APP_FBKEY,
  authDomain: process.env.VUE_APP_FBDOMAIN,
  databaseURL: process.env.VUE_APP_FBDBURL,
  projectId: process.env.VUE_APP_FBPID,
  storageBucket: process.env.VUE_APP_FBBUCKET,
  messagingSenderId: process.env.VUE_APP_FBMSID,
  appId: process.env.VUE_APP_APPID,
};

firebase.initializeApp(config);
