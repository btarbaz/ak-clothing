import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    createUserDocFromAuth(user);
  };
  return (
    <div>
      <h2>This is Sign In Page</h2>
      <button onClick={logGoogleUser}>Sign In with Google</button>
    </div>
  );
};

export default SignIn;
