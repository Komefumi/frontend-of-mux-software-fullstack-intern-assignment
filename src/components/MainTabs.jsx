import React, { useState } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { useHistory, useRouteMatch, useLocation, Link } from 'react-router-dom';
import { ROUTE_MAJOR_ADD_INFO, ROUTE_MAJOR_LIST_INFO } from '../constants';

const useStateFromRoute = () => {
  const { pathname } = useLocation();
  const location = pathname.slice(1).split('/')[0];
  let val = null;

  if ('/' + location === ROUTE_MAJOR_ADD_INFO) val = 0;
  else val = 1;

  return useState(val);
};

const DisabledTabs = () => {
  const [value, setValue] = useStateFromRoute();
  const result = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper style={{ zIndex: 1 }} square>
      <Tabs
        value={value}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChange}
        aria-label='disabled tabs example'
      >
        <Tab
          label='Add Information'
          component={Link}
          to={ROUTE_MAJOR_ADD_INFO}
          // onChange={routeSwitch(ROUTE_MAJOR_ADD_INFO)}
        />
        <Tab
          label='List Information'
          component={Link}
          to={ROUTE_MAJOR_LIST_INFO}
        />
      </Tabs>
    </Paper>
  );
};

export default DisabledTabs;
