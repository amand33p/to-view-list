import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useAlertStyles } from '../styles/muiStyles';
import demoCreds from '../data/demoCreds';

const DemoCredsBox = () => {
  const classes = useAlertStyles();

  return (
    <div className={classes.root}>
      <Alert severity="info">
        <AlertTitle>Demo Account Credentials</AlertTitle>
        {demoCreds}
      </Alert>
    </div>
  );
};

export default DemoCredsBox;
