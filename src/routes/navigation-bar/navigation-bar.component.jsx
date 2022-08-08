import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import { ReactComponent as AkLogo } from '../../assets/ak.svg';
import './navigation-bar.styles.scss';

const NavigationBar = () => {
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
          <Link className="nav-bar-link" to="sign-in">
            SIGN IN
          </Link>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </Fragment>
  );
};

export default NavigationBar;
