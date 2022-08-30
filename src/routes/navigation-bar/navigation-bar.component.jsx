import { Outlet } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux/es/exports';

import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as AkLogo } from '../../assets/ak.svg';
import {
  NavBarContainer,
  LogoContainer,
  NavBarLinksContainer,
  NavBarLink,
} from './navigation-bar.styles';
import { selectCurrentUser } from '../../store/user/user.selector';

const NavigationBar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);
  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
      <NavBarContainer>
        <LogoContainer to="/">
          <AkLogo className="logo" />
        </LogoContainer>
        <NavBarLinksContainer>
          <NavBarLink to="shop">SHOP</NavBarLink>
          {currentUser ? (
            <NavBarLink as="span" onClick={signOutHandler}>
              SIGN OUT
            </NavBarLink>
          ) : (
            <NavBarLink to="auth">SIGN IN</NavBarLink>
          )}
          <CartIcon />
        </NavBarLinksContainer>
      </NavBarContainer>
      {isCartOpen && <CartDropdown />}
      <div>
        <Outlet />
      </div>
    </Fragment>
  );
};

export default NavigationBar;
