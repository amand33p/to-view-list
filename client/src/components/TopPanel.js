import React from 'react';
import Search from './Search';
import Filter from './Filter';
import { Link as RouterLink } from 'react-router-dom';

import { Paper, Button } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';

const TopPanel = () => {
  return (
    <Paper style={{ marginTop: 15, padding: 10 }}>
      <Search />
      <Filter />
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
    </Paper>
  );
};

export default TopPanel;
