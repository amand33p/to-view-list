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
import notify from './utils/notifyDispatcher';

import { Paper } from '@material-ui/core/';
import { useMainPaperStyles } from './styles/muiStyles';
import customTheme from './styles/customTheme';
import { ThemeProvider } from '@material-ui/core/styles';

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
        entryDispatch(toggleIsLoading());

        if (err?.response?.data?.error) {
          notify(entryDispatch, `${err.response.data.error}`, 'error');
        } else {
          notify(entryDispatch, `${err.message}`, 'error');
        }
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

  return (
    <ThemeProvider theme={customTheme(darkMode)}>
      <Paper className={classes.root} elevation={0}>
        <NavBar />
        <Routes />
        {notification && (
          <ToastNotify
            open={Boolean(notification)}
            handleClose={() => entryDispatch(clearNotification())}
            severity={notification.severity}
            message={notification.message}
          />
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default App;
