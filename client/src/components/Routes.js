import React from 'react';
import { Switch, Route, Link as RouterLink } from 'react-router-dom';
import Search from './Search';
import Filter from './Filter';
import EntriesDisplay from './EntriesDisplay';
import AddUpdateForm from './AddUpdateForm';

import { Paper, Button } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
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

        <EntriesDisplay />
      </Route>
      <Route exact path="/add_update">
        <AddUpdateForm />
      </Route>
    </Switch>
  );
};

export default Routes;
