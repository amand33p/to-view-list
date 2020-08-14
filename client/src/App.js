import React from 'react';
import NavBar from './components/NavBar';
import EntryForm from './components/EntryForm';

import Container from '@material-ui/core/Container';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff9898',
    },
    secondary: {
      main: '#000000',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <Container disableGutters>
        <NavBar />
        <EntryForm />
      </Container>
    </ThemeProvider>
  );
};

export default App;
