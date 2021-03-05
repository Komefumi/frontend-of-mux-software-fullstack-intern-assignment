import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

const mainGridConfigForSideSpace = {
  xs: 0,
  sm: 2,
};

const mainGridConfigForContent = {
  xs: 12,
  sm: 8,
};

export { theme, mainGridConfigForSideSpace, mainGridConfigForContent };
