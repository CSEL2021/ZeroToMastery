import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
//firebase/app is the JS library we can use the functionality of
//interactive with the firebase website via CRUD
//intialiszeApp is one the method of firebase/app to initialize the
//firebase/app
//firebase is built up with many micro libraries suck as firebase/app
//and firebase/auth

const firebaseConfig = {
  apiKey: 'AIzaSyCGDW2xcL4Fx3ILZGFyzROQspfWDIN7v-Q',
  authDomain: 'crwn-clothing-db-fcb43.firebaseapp.com',
  projectId: 'crwn-clothing-db-fcb43',
  storageBucket: 'crwn-clothing-db-fcb43.appspot.com',
  messagingSenderId: '500783423213',
  appId: '1:500783423213:web:4def1df3467013e0f8b6e4',
};
//firebaseConfig is the instance of firebase we have created at the
//firebase offical website

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
//to initialize the GoogleAuthProvider instance

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithGooglePopup(auth, provider);
// we can have different multiple prodiver apart from Google
