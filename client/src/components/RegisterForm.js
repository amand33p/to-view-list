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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';

const RegisterForm = () => {
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const { displayName, email, password } = user;

  const classes = useRegisterLoginForm();

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (password !== confirmPassword)
      return console.log('confirm password fail');
    console.log(JSON.stringify(null, 2, user), confirmPassword);
  };

  return (
    <Paper>
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
      </FormControl>
    </Paper>
  );
};

export default RegisterForm;
