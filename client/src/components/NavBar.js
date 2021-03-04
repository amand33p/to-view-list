import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/auth/authState';
import { logoutUser } from '../context/auth/authReducer';
import { useEntryContext } from '../context/entry/entryState';
import { toggleDarkMode } from '../context/entry/entryReducer';
import storageService from '../utils/localStorageHelpers';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Switch,
  Link,
  Container,
} from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [{ user }, authDispatch] = useAuthContext();
  const [{ darkMode }, entryDispatch] = useEntryContext();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useNavStyles();

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authDispatch(logoutUser());
    storageService.logoutUser();
    if (isMobile) {
      handleClose();
    }
  };

  const handleDarkMode = () => {
    entryDispatch(toggleDarkMode());
    storageService.saveDarkMode(!darkMode);
    if (isMobile) {
      handleClose();
    }
  };

  const loggedUser = storageService.loadUser() || user;

  const mobileMenu = () => {
    return user ? (
      <div>
        <MenuItem onClick={() => handleClose()}>
          Hi, {user && user.displayName}
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>{' '}
      </div>
    ) : (
      <div>
        <MenuItem
          component={RouterLink}
          to="/register"
          onClick={() => handleClose()}
        >
          Register
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/login"
          onClick={() => handleClose()}
        >
          Login
        </MenuItem>{' '}
      </div>
    );
  };

  const desktopMenu = () => {
    return user ? (
      <>
        <Typography variant="body1" className={classes.user}>
          Hi, {user && user.displayName}
        </Typography>
        <Button
          color="inherit"
          startIcon={<PowerSettingsNewIcon />}
          onClick={handleLogout}
          className={classes.navButtons}
        >
          Logout
        </Button>{' '}
      </>
    ) : (
      <>
        <Button
          component={RouterLink}
          to="/register"
          color="inherit"
          className={classes.navButtons}
        >
          Register
        </Button>
        <Button
          component={RouterLink}
          to="/login"
          color="inherit"
          className={classes.navButtons}
        >
          Login
        </Button>
      </>
    );
  };

  const darkModeSwitch = () => {
    if (isMobile) {
      return <Switch checked={darkMode} onChange={handleDarkMode} />;
    }

    return (
      <Switch
        checked={darkMode}
        onChange={handleDarkMode}
        icon={<Brightness7Icon style={{ color: ' #f9a723' }} />}
        checkedIcon={<Brightness4Icon style={{ color: '#6a0dad' }} />}
      />
    );
  };

  return (
    <Container disableGutters className={classes.navContainer}>
      <AppBar color="primary" elevation={1} position="static">
        <Toolbar variant="dense" disableGutters={isMobile}>
          <div className={classes.topLeftButton}>
            {location.pathname === '/' || !loggedUser ? (
              <div className={classes.logoWrapper}>
                <Typography variant="h6" className={classes.logo}>
                  <ListAltRoundedIcon className={classes.logoIcon} />
                  ToViewList
                </Typography>
                <Typography variant="caption" className={classes.madeBy}>
                  Made with <FavoriteIcon style={{ fontSize: 11 }} /> by{' '}
                  <Link
                    href={'https://github.com/amand33p'}
                    color="inherit"
                    target="_blank"
                    rel="noopener"
                  >
                    amand33p
                  </Link>
                </Typography>
              </div>
            ) : (
              <Button
                component={RouterLink}
                to="/"
                color="inherit"
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
            )}
          </div>
          {isMobile ? (
            <>
              <IconButton onClick={handleMenu} color="inherit">
                <MoreVertIcon />
              </IconButton>
              <Menu
                keepMounted
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {mobileMenu()}
                <MenuItem>
                  Dark mode:
                  {darkModeSwitch()}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {desktopMenu()}
              {darkModeSwitch()}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default NavBar;
