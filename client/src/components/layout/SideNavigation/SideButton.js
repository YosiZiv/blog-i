import React from 'react';
import classes from './SideButton.module.css';
const sideNavigation = props => (
  <button className={classes.ToggleButton} onClick={props.click}>
    <span className={classes.toggleButtonLine} />
    <span className={classes.toggleButtonLine} />
    <span className={classes.toggleButtonLine} />
  </button>
);
export default sideNavigation;
