import {
  createAuthUserDocWithEmailAndPassword,
  createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils';

import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { SignUpContainer, SignUpTitle } from './sign-up-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const clearFields = () => {
    setFormFields(defaultFormFields);
  };
  const onChangeHandler = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitHandler = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Password not matched');
      return;
    }

    try {
      const { user } = await createAuthUserDocWithEmailAndPassword(
        email,
        password
      );
      await createUserDocFromAuth(user, { displayName });
      clearFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already registered');
      } else {
        console.log('user creation encoutered an error', error);
      }
    }
  };
  return (
    <SignUpContainer>
      <SignUpTitle>Don't have an account ?</SignUpTitle>
      <span>Sign Up with your email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={onChangeHandler}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={onChangeHandler}
          name="confirmPassword"
          value={confirmPassword}
        />
        {/*Button Component*/}
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};
export default SignUpForm;
