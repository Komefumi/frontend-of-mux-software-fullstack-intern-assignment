import React, { useState, useEffect } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { useLocation, Link } from 'react-router-dom';
import { ROUTE_MAJOR_ADD_INFO, ROUTE_MAJOR_LIST_INFO } from '../constants';

const MainTabs = () => {
  // const [value, setValue] = useStateFromRoute();
  const [value, setValue] = useState(0);
  const { pathname } = useLocation();

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const val = pathname.split('/')[1];
    if (val === 'add') setValue(0);
    else setValue(1);
  }, [pathname]);

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

export default MainTabs;
