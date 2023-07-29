 import React from 'react';
 import { useStyles } from './SelectButtonCss';

const SelectButton = ({ children, selected, onClick }) => {


  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;