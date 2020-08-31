import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import storageService from './utils/localStorageHelpers';
import { useAuthContext } from './context/auth/authState';
import { loginUser } from './context/auth/authReducer';

import Container from '@material-ui/core/Container';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#4d577a',
      dark: '#6f7ba4',
    },
    secondary: {
      main: '#9a8fb8',
      dark: '#c4bed6',
    },
  },
});

const App = () => {
  const [, dispatch] = useAuthContext();

  useEffect(() => {
    const loggedUser = storageService.loadUser();

    if (loggedUser) {
      dispatch(loginUser(loggedUser));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={customTheme}>
      <Container disableGutters>
        <NavBar />
        <Routes />
      </Container>
    </ThemeProvider>
  );
};

export default App;
