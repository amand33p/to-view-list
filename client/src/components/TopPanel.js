import React from 'react';
import Search from './Search';
import Filter from './Filter';
import { Link as RouterLink } from 'react-router-dom';
import { useEntryContext } from '../context/entry/entryState';
import { resetEditValues } from '../context/entry/entryReducer';

import { Paper, Button, Fab, useMediaQuery } from '@material-ui/core';
import { useTopPanelStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import HideOnScroll from './HideOnScroll';
import PostAddIcon from '@material-ui/icons/PostAdd';

const TopPanel = () => {
  const [, dispatch] = useEntryContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useTopPanelStyles();

  return (
    <Paper className={classes.root}>
      <Search />
      <Filter />
      {!isMobile ? (
        <Button
          className={classes.desktopButton}
          component={RouterLink}
          to="/add_update"
          size="large"
          variant="contained"
          color="primary"
          startIcon={<PostAddIcon />}
          onClick={() => dispatch(resetEditValues())}
        >
          Add Entry
        </Button>
      ) : (
        <HideOnScroll>
          <Fab
            className={classes.fab}
            color="primary"
            component={RouterLink}
            to="/add_update"
            onClick={() => dispatch(resetEditValues())}
          >
            <PostAddIcon />
          </Fab>
        </HideOnScroll>
      )}
    </Paper>
  );
};

export default TopPanel;
