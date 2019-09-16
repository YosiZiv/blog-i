import React from 'react';
import classes from './Button.module.css';

const button = props => {
  const { size, clicked, btnType, children } = props;
  return (
    <button
      style={size}
      // disabled={props.disabled}
      type="button"
      className={[classes.Button, classes[btnType]].join(' ')}
      onClick={clicked}
    >
      {children}
    </button>
  );
};
export default button;
