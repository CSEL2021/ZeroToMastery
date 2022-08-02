import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.style.scss';

const Authentication = () => {
  // -----using to other provider to sign in suck as Facebook, GitHut ---
  //it needs to use signInWithRedirect,
  // useEffect(async () => {
  //   const response = await getRedirectResult(auth);
  //   if (response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //   }
  // }, []);
  //As signInWithRedirect leads to a new domain and come back to this website
  //the whole website will first render again.

  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
