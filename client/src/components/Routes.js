import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EntriesDisplay from './EntriesDisplay';
import AddUpdateForm from './AddUpdateForm';
import TopPanel from './TopPanel';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <TopPanel />
        <EntriesDisplay />
      </Route>
      <Route exact path="/add_update">
        <AddUpdateForm />
      </Route>
    </Switch>
  );
};

export default Routes;
