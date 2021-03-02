import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = (darkMode) =>
  createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#949aaf' : '#4d577a',
      },
      secondary: {
        main: darkMode ? '#d6d2e2' : '#6f6098',
      },
    },
    overrides: {
      MuiTypography: {
        root: {
          wordBreak: 'break-word',
        },
      },
    },
  });

export default customTheme;
