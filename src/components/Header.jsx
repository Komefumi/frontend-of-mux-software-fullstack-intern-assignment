import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AcUnit as AcUnitIcon } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar style={{ zIndex: 0 }} position='relative'>
      <Toolbar>
        <Typography className={classes.typographyStyles} variant='h2'>
          This is the header
        </Typography>
        <AcUnitIcon />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
