import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';
import SideButton from '../SideNavigation/SideButton';
import Logo from '../Logo/Logo';
const navigation = props => (
  <div className={classes.NavigationContainer}>
    <ul className={classes.NavigatinLink}>
      <Logo />
      <li>
        <NavLink activeClassName={classes.active} to="/" exact>
          Home <i className="fas fa-home" />
        </NavLink>
      </li>
      {!props.isAuth ? (
        <li>
          <NavLink activeClassName={classes.active} to="/login">
            Login <i className="far fa-images" />
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink activeClassName={classes.active} to="/logout">
            Logout <i className="far fa-images" />
          </NavLink>
        </li>
      )}
    </ul>
    <div className={classes.SideButton}>
      <SideButton click={props.drawerToggleClick} />
    </div>
  </div>
);
export default navigation;
