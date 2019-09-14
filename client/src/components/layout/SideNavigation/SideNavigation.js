import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './SideNavigation.module.css';
const SideNavigation = props => {
  let drawerClasses = classes.SideNavigation;
  if (props.show) {
    drawerClasses = classes.SideNavigation + ' ' + classes.Open;
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/" exact>
            Home <i className="fas fa-home" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName={classes.active}>
            Login <i className="fas fa-address-card" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
