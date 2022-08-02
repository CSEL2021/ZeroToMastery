import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
//doc is the instance of data, getDoc is to access the data of the instance

const firebaseConfig = {
  apiKey: 'AIzaSyCGDW2xcL4Fx3ILZGFyzROQspfWDIN7v-Q',
  authDomain: 'crwn-clothing-db-fcb43.firebaseapp.com',
  projectId: 'crwn-clothing-db-fcb43',
  storageBucket: 'crwn-clothing-db-fcb43.appspot.com',
  messagingSenderId: '500783423213',
  appId: '1:500783423213:web:4def1df3467013e0f8b6e4',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   console.log(userAuth);
// };

export const auth = getAuth();
//Authentication state/ information throught the whole application and firebase website
//when redirect (comeback with auth)
//or by using googleProvider (whitout leafs toa new domain and comeback the website)
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
//signInWithRedirect leads to the webpage to a new webpage (the other domain)
//So the webpage will unmount the whole application,
//when redirect to this website, it re-render the whole website again

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'user', userAuth.uid);
  //doc takes three arguements (1) the Firebase database, (2) the collection
  // (3)

  const userShapshot = await getDoc(userDocRef);

  if (!userShapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creawting the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callBack) => {
  onAuthStateChanged(auth, callBack);
};
//it is a function declaration and it executed at user.context.
// onAuthStateChanged() takes 2 parameter: (1) the state being observed,
//(2) the callback invoked when the state changed. It returns uts callback function
// Dennis: the callback takes the one parameter which is the auth (getAuth) state
