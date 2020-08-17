import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './Search';
import Filter from './Filter';
import EntriesDisplay from './EntriesDisplay';
import AddUpdateForm from './AddUpdateForm';

import { Paper } from '@material-ui/core';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Paper style={{ marginTop: 15, padding: 10 }}>
          <Search />
          <Filter />
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
