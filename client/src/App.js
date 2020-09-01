import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import entryService from './services/entries';
import storageService from './utils/localStorageHelpers';
import { useAuthContext } from './context/auth/authState';
import { loginUser } from './context/auth/authReducer';
import { useEntryContext } from './context/entry/entryState';
import {
  initializeEntries,
  toggleDarkMode,
} from './context/entry/entryReducer';

import { Container, Paper } from '@material-ui/core/';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const App = () => {
  const [{ user }, authDispatch] = useAuthContext();
  const [{ darkMode }, entryDispatch] = useEntryContext();

  useEffect(() => {
    const loggedUser = storageService.loadUser();

    if (loggedUser) {
      authDispatch(loginUser(loggedUser));
      entryService.setToken(loggedUser.token);
    }
  }, [authDispatch]);

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        const entries = await entryService.getAll();
        entryDispatch(initializeEntries(entries));
      } catch (err) {
        console.log(err);
        console.log(err.response.data.error);
      }
    };
    if (user) {
      getAllEntries();
    }
  }, [entryDispatch, user]);

  useEffect(() => {
    const isDarkMode = storageService.loadDarkMode();
    if (isDarkMode) {
      entryDispatch(toggleDarkMode());
    }
  }, [entryDispatch]);

  const customTheme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#949aaf' : '#4d577a',
      },
      secondary: {
        main: darkMode ? '#d6d2e2' : '#9a8fb8',
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Paper style={{ height: '100vH' }}>
        <Container disableGutters>
          <NavBar />
          <Routes />
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
