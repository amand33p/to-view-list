import React from 'react';

import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const ToastNotify = ({ open, handleClose, severity, message, duration }) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotify;
