import React, { Fragment as ReactFragment } from 'react';
import { Grid } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/Header';
import MainTabs from './components/MainTabs';

import AddInfoPage from './pages/AddInfo';
import ListInfoPage from './pages/ListInfo';

import { store } from './store';

import {
  theme,
  mainGridConfigForSideSpace,
  mainGridConfigForContent,
} from './config/themeing';

import {
  ROUTE_ROOT,
  ROUTE_MAJOR_ADD_INFO,
  ROUTE_MAJOR_LIST_INFO,
} from './constants';

function App() {
  return (
    <ReactFragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Grid container direction='column'>
          <Grid item>
            <Header />
          </Grid>
          {/* <Header /> */}
          {/* <Grid item container>
            <Grid {...mainGridConfigForSideSpace} />
            <Grid {...mainGridConfigForContent}>
              <Header />
            </Grid>
            <Grid {...mainGridConfigForSideSpace} />
          </Grid> */}
          <Grid item container>
            <Grid {...mainGridConfigForSideSpace} item />
            <Grid {...mainGridConfigForContent} item>
              {/* This is where we will have the content */}
              <Router>
                <MainTabs />
                <Switch>
                  <Route component={AddInfoPage} path={ROUTE_MAJOR_ADD_INFO} />
                  <Route
                    component={ListInfoPage}
                    path={ROUTE_MAJOR_LIST_INFO}
                  />
                  <Redirect from={ROUTE_ROOT} to={ROUTE_MAJOR_ADD_INFO} exact />
                </Switch>
              </Router>
            </Grid>
            <Grid {...mainGridConfigForSideSpace} item />
          </Grid>
        </Grid>
      </ThemeProvider>
    </ReactFragment>
  );
}

function AppWithRedux() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWithRedux;
