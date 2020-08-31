import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from '../context/auth/authState';
import { logoutUser } from '../context/auth/authReducer';
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
} from '@material-ui/core';

import { useNavStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [{ user }, dispatch] = useAuthContext();

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useNavStyles();

  const handleLogout = () => {
    dispatch(logoutUser());
    storageService.logoutUser();
    if (isMobile) {
      handleClose();
    }
  };

  return (
    <div className={classes.main}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.title}>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<ListAltRoundedIcon />}
              color="inherit"
              className={classes.titleButton}
              size="large"
            >
              ToViewList
            </Button>
          </div>

          {isMobile ? (
            <>
              <IconButton onClick={handleMenu} color="inherit">
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {user ? (
                  <>
                    <MenuItem>
                      Current user: {user && user.displayName}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>{' '}
                  </>
                ) : null}
              </Menu>
            </>
          ) : (
            <>
              {user ? (
                <>
                  <Typography variant="body1" className={classes.user}>
                    Hi, {user && user.displayName}
                  </Typography>
                  <Button
                    color="inherit"
                    endIcon={<ExitToAppIcon />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>{' '}
                </>
              ) : null}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
