import React, { useEffect } from 'react';
import ToastNotify from './components/ToastNotify';
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
  clearNotification,
  toggleIsLoading,
} from './context/entry/entryReducer';

import { Container, Paper } from '@material-ui/core/';
import { useMainPaperStyles } from './styles/muiStyles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const App = () => {
  const [{ user }, authDispatch] = useAuthContext();
  const [{ darkMode, notification }, entryDispatch] = useEntryContext();

  const classes = useMainPaperStyles();

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
        entryDispatch(toggleIsLoading());

        const entries = await entryService.getAll();
        entryDispatch(initializeEntries(entries));

        entryDispatch(toggleIsLoading());
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
    if (isDarkMode === 'true') {
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
      <Paper className={classes.root} elevation={0}>
        <Container disableGutters>
          {notification && (
            <ToastNotify
              open={Boolean(notification)}
              handleClose={() => entryDispatch(clearNotification())}
              severity={notification.severity}
              message={notification.message}
            />
          )}
          <NavBar />
          <Routes />
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
