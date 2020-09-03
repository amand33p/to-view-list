import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import AlertBox from './AlertBox';
import authService from '../services/auth';
import entryService from '../services/entries';
import { useAuthContext } from '../context/auth/authState';
import { useEntryContext } from '../context/entry/entryState';
import { loginUser } from '../context/auth/authReducer';
import storageService from '../utils/localStorageHelpers';
import notify from '../utils/notifyDispatcher';

import {
  FormControl,
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
  const [error, setError] = useState({
    message: `email: 'test@test.com' & password: 'password'`,
    severity: 'info',
    title: 'Demo account credentials',
  });
  const [showPassword, setShowPassword] = useState(false);

  const [, authDispatch] = useAuthContext();
  const [, entryDispatch] = useEntryContext();
  const classes = useRegisterLoginForm();
  const history = useHistory();

  const { email, password } = credentials;

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.login(credentials);
      entryService.setToken(user.token);
      authDispatch(loginUser(user));
      storageService.saveUser(user);

      history.push('/');
      setCredentials({
        email: '',
        password: '',
      });
      setError(null);
      notify(
        entryDispatch,
        `Welcome, ${user.displayName}! You're logged in.`,
        'success'
      );
    } catch (err) {
      if (err.response.data && err.response.data.error) {
        setError({ message: err.response.data.error, severity: 'error' });
      } else {
        setError({ message: err.message, severity: 'error' });
      }
    }
  };

  return (
    <Paper className={classes.rootPaper}>
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
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={password}
            name="password"
            onChange={handleOnChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
        >
          Login
        </Button>
        <Typography variant="body1" className={classes.bottomText}>
          Don't have an account?{' '}
          <Link component={RouterLink} to="/register">
            Register.
          </Link>
        </Typography>

        <AlertBox
          message={error.message}
          severity={error.severity}
          clearError={() => setError(null)}
          title={error.title}
        />
      </FormControl>
    </Paper>
  );
};

export default LoginForm;
