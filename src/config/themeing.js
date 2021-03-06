import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  },
});

const mainGridConfigForSideSpace = {
  xs: false,
  sm: 2,
};

const mainGridConfigForContent = {
  xs: 12,
  sm: 8,
};

export { theme, mainGridConfigForSideSpace, mainGridConfigForContent };
