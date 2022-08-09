// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';
import {
  // auth,
  signInWithGooglePopup,
  createUserDocFromAuth,
  // signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  // // for redirect sign in
  // // after re mount app we want user
  // useEffect(() => {
  //   const logGoogleUserRedirect = async () => {
  //     const response = await getRedirectResult(auth);
  //     console.log(response);
  //     if (response) {
  //       const userDocRef = await createUserDocFromAuth(response.user);
  //     }
  //   };
  //   logGoogleUserRedirect();
  // }, []);

  const logGoogleUserPopUp = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocFromAuth(user);
  };
  return (
    <div>
      <h2>This is Sign In Page</h2>
      <button onClick={logGoogleUserPopUp}>Sign In with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign In with Google Redirect
      </button> */}
      <SignUpForm />
    </div>
  );
};

export default SignIn;
