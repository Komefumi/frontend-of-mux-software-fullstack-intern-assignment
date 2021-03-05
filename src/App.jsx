import React, { Fragment as ReactFragment } from 'react';
import { Grid } from '@material-ui/core';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/Header';

import {
  theme,
  mainGridConfigForSideSpace,
  mainGridConfigForContent,
} from './config/themeing';

function App() {
  return (
    <ReactFragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Grid container direction='column'>
          <Grid item container>
            <Grid {...mainGridConfigForSideSpace} />
            <Grid {...mainGridConfigForContent}>
              <Header />
            </Grid>
            <Grid {...mainGridConfigForSideSpace} />
          </Grid>
          <Grid item container>
            <Grid {...mainGridConfigForSideSpace} />
            <Grid {...mainGridConfigForContent}>
              This is where we will have the content
            </Grid>
            <Grid {...mainGridConfigForSideSpace} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </ReactFragment>
  );
}

export default App;
