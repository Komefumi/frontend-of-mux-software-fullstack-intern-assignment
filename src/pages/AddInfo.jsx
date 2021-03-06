import { useState, useEffect } from 'react';
import { Grid, Paper, Tabs, Tab } from '@material-ui/core';
import {
  useRouteMatch,
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import {
  // ROUTE_ROOT,
  ROUTE_MAJOR_ADD_INFO,
  ROUTE_MINOR_CUSTOMER,
  ROUTE_MINOR_FIELD,
  // ROUTE_MINOR_ADD_FIELD,
} from '../constants';

const ROUTE_ADD_CUSTOMER = `${ROUTE_MAJOR_ADD_INFO}/${ROUTE_MINOR_CUSTOMER}/`;
const ROUTE_ADD_FIELD = `${ROUTE_MAJOR_ADD_INFO}/${ROUTE_MINOR_FIELD}/`;

const useStateFromRoute = () => {
  const { pathname } = useLocation();
  console.log({ pathname });
  const location = pathname.slice(1).split('/')[1];
  let val = null;

  console.log({ location, ROUTE_MINOR_CUSTOMER });

  if (location === ROUTE_MINOR_CUSTOMER) val = 0;
  else val = 1;

  return useState(val);
};

const AddInfoTabs = () => {
  const [value, setValue] = useState(0);
  const { pathname } = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const val = pathname.slice(1).split('/')[1];
    switch (val) {
      case ROUTE_MINOR_CUSTOMER:
        setValue(0);
        break;
      case ROUTE_MINOR_FIELD:
        setValue(1);
        break;
      default:
        setValue(0);
    }
  }, [pathname]);

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChange}
        aria-label='disabled tabs example'
      >
        <Tab
          label='Add Customer'
          component={Link}
          to={`${ROUTE_MAJOR_ADD_INFO}/${ROUTE_MINOR_CUSTOMER}`}
        />
        <Tab
          label='Add Field'
          component={Link}
          to={`${ROUTE_MAJOR_ADD_INFO}/${ROUTE_MINOR_FIELD}`}
        />
      </Tabs>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const AddCustomer = () => {
  const classes = useStyles();
  console.log('Add Customer');

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <TextField id='first-name' label='First Name' />
        <TextField id='last-name' label='Last Name' />
      </div>
    </form>
  );
};

const AddField = () => {
  const classes = useStyles();
  console.log('Add Customer');

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <TextField id='field-name' label='Field Name' />
        <TextField id='field-type' label='Field Type' />
      </div>
    </form>
  );
};

const AddInfo = () => {
  let { path } = useRouteMatch();
  return (
    <Grid container direction='column'>
      <Grid item>
        <AddInfoTabs />
      </Grid>
      <Grid item>
        <Switch>
          <Redirect
            exact
            from={`${ROUTE_MAJOR_ADD_INFO}/`}
            to={`${ROUTE_MINOR_CUSTOMER}`}
          />
          <Route
            component={AddCustomer}
            // render={<AddCustomer />}
            path={`${ROUTE_ADD_CUSTOMER}`}
          />
          <Route component={AddField} path={`${ROUTE_ADD_FIELD}`} />
        </Switch>
      </Grid>
    </Grid>
  );
};

export default AddInfo;
