import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
                <MenuItem onClick={handleClose}>Aman logged in</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Typography variant="body1" className={classes.user}>
                Hi, Aman
              </Typography>
              <Button color="inherit" endIcon={<ExitToAppIcon />}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
