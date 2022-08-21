import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_CLASS_TYPE } from '../button/button.component';
import {
  SignInContainer,
  SignInTitle,
  ButtonsContainer,
} from './sign-in-form.styles';

import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import { useState } from 'react';
const defaultFormFields = {
  email: '',
  password: '',
};
const SignInForm = () => {
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
      await signInUserWithEmailAndPassword(email, password);
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
    await signInWithGooglePopup();
  };

  return (
    <SignInContainer>
      <SignInTitle>Already have an account ?</SignInTitle>
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
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_CLASS_TYPE.google}
            onClick={logGoogleUserPopUp}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
