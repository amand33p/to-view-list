import React from 'react';
import Search from './Search';
import Filter from './Filter';
import { Link as RouterLink } from 'react-router-dom';

import { Paper, Button, Fab, useMediaQuery } from '@material-ui/core';
import { useFabStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';

const TopPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useFabStyles();

  return (
    <Paper style={{ marginTop: 15, padding: 10 }}>
      <Search />
      <Filter />
      {!isMobile ? (
        <Button
          style={{ margin: '8px 0px 5px 19px' }}
          component={RouterLink}
          to="/add_update"
          size="large"
          variant="contained"
          color="primary"
          startIcon={<PostAddIcon />}
        >
          Add Entry
        </Button>
      ) : (
        <Fab
          className={classes.root}
          color="primary"
          component={RouterLink}
          to="/add_update"
        >
          <PostAddIcon />
        </Fab>
      )}
    </Paper>
  );
};

export default TopPanel;
