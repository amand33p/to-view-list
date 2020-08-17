import React from 'react';
import NavBar from './components/NavBar';
import Routes from './components/Routes';

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
