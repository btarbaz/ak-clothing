import {
  BaseButton,
  InvertedButton,
  GoogleSignInButton,
} from './button.styles';

export const BUTTON_CLASS_TYPE = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

const getButtonType = (buttonType = BUTTON_CLASS_TYPE.base) =>
  ({
    [BUTTON_CLASS_TYPE.base]: BaseButton,
    [BUTTON_CLASS_TYPE.inverted]: InvertedButton,
    [BUTTON_CLASS_TYPE.google]: GoogleSignInButton,
  }[buttonType]);
const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButtonType(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
