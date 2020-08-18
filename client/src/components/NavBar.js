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

import { makeStyles, useTheme } from '@material-ui/core/styles';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  user: {
    marginRight: 10,
  },
  titleButton: {
    textTransform: 'capitalize',
    fontSize: 20,
  },
}));

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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.title}>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<FormatListBulletedIcon fontSize="large" />}
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
