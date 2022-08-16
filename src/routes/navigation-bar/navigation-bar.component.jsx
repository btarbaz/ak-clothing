import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as AkLogo } from '../../assets/ak.svg';
import './navigation-bar.styles.scss';

const NavigationBar = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
      <div className="nav-bar-container">
        <Link className="logo-container" to="/">
          <AkLogo className="logo" />
        </Link>
        <div className="nav-bar-links-container">
          <Link className="nav-bar-link" to="shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-bar-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-bar-link" to="auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
      </div>
      {isCartOpen && <CartDropdown />}
      <div>
        <Outlet />
      </div>
    </Fragment>
  );
};

export default NavigationBar;
