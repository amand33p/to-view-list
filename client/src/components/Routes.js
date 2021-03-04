import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import EntriesDisplay from './EntriesDisplay';
import AddUpdateForm from './AddUpdateForm';
import TopPanel from './TopPanel';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useAuthContext } from '../context/auth/authState';
import storageService from '../utils/localStorageHelpers';
import { Container } from '@material-ui/core';

const Routes = () => {
  const [{ user }] = useAuthContext();
  const loggedUser = storageService.loadUser() || user;

  return (
    <Container disableGutters>
      <Switch>
        <Route exact path="/">
          {loggedUser ? (
            <>
              <TopPanel />
              <EntriesDisplay />
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/add_update">
          {loggedUser ? <AddUpdateForm /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/register">
          <RegisterForm />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
      </Switch>
    </Container>
  );
};

export default Routes;
