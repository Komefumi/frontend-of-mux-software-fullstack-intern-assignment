import React, { Fragment as ReactFragment } from 'react';
import { Grid, Snackbar } from '@material-ui/core';
import { Alert as MuiAlert } from '@material-ui/lab';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/Header';
import MainTabs from './components/MainTabs';
import ConfirmDialog from './components/ConfirmDialog';

import AddInfoPage from './pages/AddInfo';
import ListInfoPage from './pages/ListInfo';

import { store } from './store';

import { theme } from './config/themeing';

import {
  ROUTE_ROOT,
  ROUTE_MAJOR_ADD_INFO,
  ROUTE_MAJOR_LIST_INFO,
  UNSET_FLASH_MESSAGE,
} from './constants';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

function App() {
  const {
    flashMessage,
    severity,
    dialog: { title: dialogOpen },
  } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const snackClose = () => {
    dispatch({ type: UNSET_FLASH_MESSAGE });
  };

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
            {/* <Grid {...mainGridConfigForSideSpace} item /> */}
            <Grid sm={false} md={2} item />
            <Grid sm={12} md={8} item container direction='column'>
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
            <Grid sm={false} md={2} item />
            {/* <Grid {...mainGridConfigForSideSpace} item /> */}
          </Grid>
        </Grid>
        {flashMessage && (
          <Snackbar
            open={flashMessage && flashMessage.length ? true : false}
            autoHideDuration={6000}
            onClose={snackClose}
          >
            <Alert onClose={snackClose} severity={severity}>
              {flashMessage}
            </Alert>
          </Snackbar>
        )}
        {dialogOpen && <ConfirmDialog />}
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
