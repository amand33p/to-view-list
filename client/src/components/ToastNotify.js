import React from 'react';

import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const ToastNotify = ({ open, handleClose, severity, message }) => {
  const duration = 5;

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration * 1000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotify;
