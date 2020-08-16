import React from 'react';
import NavBar from './components/NavBar';
import EntryForm from './components/EntryForm';

import Container from '@material-ui/core/Container';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#5a4d7a',
      dark: '#7f6fa4',
    },
    secondary: {
      main: '#714d7a',
      dark: '#9a6fa4',
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
