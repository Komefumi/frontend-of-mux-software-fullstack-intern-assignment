import React, { Fragment as ReactFragment } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import { theme } from './config/themeing';

function App() {
  return (
    <ReactFragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Button variant='contained' color='primary'>
          Hello World
        </Button>
      </ThemeProvider>
    </ReactFragment>
  );
}

export default App;
