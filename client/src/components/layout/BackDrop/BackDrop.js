import React from 'react';
import classes from './BackDrop.module.css';
const backDrop = props => (
  <div className={classes.backDrop} onClick={props.click} />
);
export default backDrop;
