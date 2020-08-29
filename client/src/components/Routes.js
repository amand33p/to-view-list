import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EntriesDisplay from './EntriesDisplay';
import AddUpdateForm from './AddUpdateForm';
import TopPanel from './TopPanel';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

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
      <Route exact path="/register">
        <RegisterForm />
      </Route>
      <Route exact path="/login">
        <LoginForm />
      </Route>
    </Switch>
  );
};

export default Routes;
