import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import AlertBox from './AlertBox';
import authService from '../services/auth';
import entryService from '../services/entries';
import { useAuthContext } from '../context/auth/authState';
import { loginUser } from '../context/auth/authReducer';
import storageService from '../utils/localStorageHelpers';

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
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const [, dispatch] = useAuthContext();
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
      dispatch(loginUser(user));
      storageService.saveUser(user);

      history.push('/');

      setCredentials({
        email: '',
        password: '',
      });
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
    }
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
        {error && (
          <AlertBox
            message={error}
            severity="error"
            clearError={() => setError(null)}
          />
        )}
      </FormControl>
    </Paper>
  );
};

export default LoginForm;
