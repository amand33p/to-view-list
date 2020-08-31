import React from 'react';

import { Alert, AlertTitle } from '@material-ui/lab';
import { useAlertStyles } from '../styles/muiStyles';

const AlertBox = ({ severity, message, clearError }) => {
  const classes = useAlertStyles();

  return (
    <div className={classes.root}>
      <Alert severity={severity} onClose={clearError}>
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </div>
  );
};

export default AlertBox;
