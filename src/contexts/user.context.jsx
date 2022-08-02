import { createContext, useState, useEffect } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  signOutUser,
} from '../utils/firebase/firebase.utils';

//the Context has 2 parts, (1) is the actual storege thing itself
//(2) is the export the content

//as the actual value you want to access
//maybe we don't need to initialize the value?
export const UserContext = createContext();
//it returns a Context Object

//export the context and by using useState to access the content
//value and setState to mutate the state value
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  //currentUser = stateValue ; setcurrentUser is a function to set a new stateValue
  // the varaible value stores the above value as a object and pass it to its children component
  const value = { currentUser, setCurrentUser };

  //export const auth = getAuth(); at firebase.utils.js, the variable
  //of auth is staill tracing the state when the webpage reloadf. But
  //the whole code of this application will be render agin.

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      setCurrentUser(user);
    });

    return unsubscribe;
    //executed the onAuthStateChangedListener
    //it call a fuction by passing a callback that
    //used in onAuthStateChanged() that will be called when auth is changed
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
//Every Context object comes with a Provider React component
//that allows consuming components to subscribe to context changes.
//meaning
/* 
  <UserContext.Provider>
  <App />
  <UserContext.Provider> 
*/
// all the <App /> and its children subscrible the use

/* 
   <UserContext.Provider>
        <App />
    <UserContext.Provider>

    (1) the above three line of codes returs 
    <UserContext.Provider value={value}><App /></UserContext.Provider>;

    (2) the parent component <UserContext /> pass the value={value}
    (currentUser, setcurrentUser) as a object to its children components

    <UserContext /> is the component set at the user.content.jsx
*/
