import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import AlertBox from './AlertBox';
import authService from '../services/auth';
import entryService from '../services/entries';
import { useAuthContext } from '../context/auth/authState';
import { registerUser } from '../context/auth/authReducer';
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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';

const RegisterForm = () => {
  const [userDetails, setUserDetails] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const [, dispatch] = useAuthContext();
  const classes = useRegisterLoginForm();
  const history = useHistory();

  const { displayName, email, password } = userDetails;

  const handleOnChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError(`Confirm password failed! Both passwords need to match.`);
    }
    try {
      const user = await authService.register(userDetails);
      entryService.setToken(user.token);
      dispatch(registerUser(user));
      storageService.saveUser(user);

      history.push('/');

      setUserDetails({
        displayName: '',
        email: '',
        password: '',
      });
      setConfirmPassword('');
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
    }
  };

  return (
    <Paper style={{ height: '100vH' }}>
      <FormControl
        component="form"
        onSubmit={handleRegister}
        margin="normal"
        className={classes.root}
      >
        <Typography variant="h4" color="primary" className={classes.formTitle}>
          Create an account
        </Typography>
        <div className={classes.input}>
          <PersonIcon color="secondary" className={classes.inputIcon} />
          <TextField
            color="secondary"
            required
            label="Display Name"
            value={displayName}
            name="displayName"
            onChange={handleOnChange}
            fullWidth
          />
        </div>
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
        <div className={classes.input}>
          <EnhancedEncryptionIcon
            color="secondary"
            className={classes.inputIcon}
          />
          <TextField
            color="secondary"
            required
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={({ target }) => setConfirmPassword(target.value)}
            fullWidth
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.submitButton}
          startIcon={<PersonAddIcon />}
        >
          Register
        </Button>
        <Typography variant="body1" className={classes.bottomText}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login">
            Login.
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

export default RegisterForm;
