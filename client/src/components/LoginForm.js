import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import AlertBox from './AlertBox';
import DemoCredsBox from './DemoCredsBox';
import authService from '../services/auth';
import entryService from '../services/entries';
import { useAuthContext } from '../context/auth/authState';
import { useEntryContext } from '../context/entry/entryState';
import { loginUser } from '../context/auth/authReducer';
import { toggleIsLoading } from '../context/entry/entryReducer';
import storageService from '../utils/localStorageHelpers';
import notify from '../utils/notifyDispatcher';

import {
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  InputAdornment,
  IconButton,
} from '@material-ui/core/';
import { useRegisterLoginForm } from '../styles/muiStyles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [, authDispatch] = useAuthContext();
  const [{ isLoading }, entryDispatch] = useEntryContext();
  const classes = useRegisterLoginForm();
  const history = useHistory();
  const { email, password } = credentials;

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      entryDispatch(toggleIsLoading());
      const user = await authService.login(credentials);
      entryService.setToken(user.token);
      authDispatch(loginUser(user));
      storageService.saveUser(user);
      entryDispatch(toggleIsLoading());

      setCredentials({
        email: '',
        password: '',
      });
      setError(null);
      history.push('/');
      notify(
        entryDispatch,
        `Welcome, ${user.displayName}! You're logged in.`,
        'success'
      );
    } catch (err) {
      entryDispatch(toggleIsLoading());

      if (err?.response?.data?.error) {
        setError({ message: err.response.data.error, severity: 'error' });
      } else {
        setError({ message: err.message, severity: 'error' });
      }
    }
  };

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleLogin} className={classes.form}>
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
            type={showPass ? 'text' : 'password'}
            label="Password"
            value={password}
            name="password"
            onChange={handleOnChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.submitButton}
          startIcon={<ExitToAppIcon />}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in' : 'Login'}
        </Button>
        <Typography variant="body1" className={classes.bottomText}>
          Don't have an account?{' '}
          <Link component={RouterLink} to="/register">
            Register.
          </Link>
        </Typography>
        {error && (
          <AlertBox
            message={error.message}
            severity={error.severity}
            clearError={() => setError(null)}
            title={error.title}
          />
        )}
        <DemoCredsBox />
      </form>
    </Paper>
  );
};

export default LoginForm;
