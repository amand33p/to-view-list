import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  FormControl,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
} from '@material-ui/core/';

import { useRegisterLoginForm } from '../styles/muiStyles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';

const LoginForm = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const classes = useRegisterLoginForm();

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    console.log(JSON.stringify(null, 2, user));
  };

  return (
    <Paper>
      <FormControl
        component="form"
        onSubmit={handleLogin}
        margin="normal"
        className={classes.root}
      >
        <Typography variant="h4" color="primary" className={classes.formTitle}>
          Login to your account
        </Typography>
        <div className={classes.input}>
          <AlternateEmailIcon color="secondary" className={classes.inputIcon} />
          <TextField
            color="secondary"
            required
            type="email"
            label="Email"
            value={email}
            name="email"
            onChange={handleOnChange}
            fullWidth
          />
        </div>
        <div className={classes.input}>
          <LockIcon color="secondary" className={classes.inputIcon} />
          <TextField
            color="secondary"
            required
            type="password"
            label="Password"
            value={password}
            name="password"
            onChange={handleOnChange}
            fullWidth
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.submitButton}
          startIcon={<ExitToAppIcon />}
        >
          Login
        </Button>
        <Typography variant="body1" className={classes.bottomText}>
          Don't have an account?{' '}
          <Link component={RouterLink} to="/register">
            Register.
          </Link>
        </Typography>
      </FormControl>
    </Paper>
  );
};

export default LoginForm;
