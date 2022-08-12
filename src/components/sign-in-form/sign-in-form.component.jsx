import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';

import {
  signInUserWithEmailAndPassword,
  createUserDocFromAuth,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
const defaultFormFields = {
  email: '',
  password: '',
};
const SignInForm = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const clearFields = () => {
    setFormFields(defaultFormFields);
  };
  const onChangeHandler = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const onSubmitHandler = async event => {
    event.preventDefault();

    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      clearFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          alert('Account not found !');
          break;
        case 'auth/wrong-password':
          alert('Wrong password !');
          break;
        default:
          console.log('Error is', error.code);
      }
    }
  };

  const logGoogleUserPopUp = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocFromAuth(user);
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account ?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={onChangeHandler}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={onChangeHandler}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType="google"
            onClick={logGoogleUserPopUp}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
