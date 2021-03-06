import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Paper, Tabs, Tab } from '@material-ui/core';

const PaperLinkTabs = ({ majorRoute, labelWithMinorRouteList }) => {
  const minorRoutes = labelWithMinorRouteList.map(({ route }) => route);
  const [value, setValue] = useState(0);
  const { pathname } = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const val = pathname.slice(1).split('/')[1];
    let found = false;
    minorRoutes.forEach((currentRoute, idx) => {
      if (currentRoute === val) {
        setValue(idx);
        found = true;
      }
    });
    if (!found) setValue(0);
  }, [pathname, minorRoutes]);

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChange}
        aria-label='Minor routing links'
      >
        {labelWithMinorRouteList.map(({ label, route: minorRoute }) => (
          <Tab
            key={minorRoute}
            label={label}
            component={Link}
            to={`${majorRoute}/${minorRoute}`}
          />
        ))}
      </Tabs>
    </Paper>
  );
};

export default PaperLinkTabs;
