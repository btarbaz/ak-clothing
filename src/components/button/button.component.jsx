import './button.styles.scss';

const buttonClassType = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${buttonClassType[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
