import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AcUnit as AcUnitIcon } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
    fontSize: '4em',
    padding: '0.075em 0',
    fontWeight: 'bolder',
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar style={{ zIndex: 0 }} position='relative'>
      <Toolbar>
        <Typography className={classes.typographyStyles} variant='h1'>
          Customer and Field Manager
        </Typography>
        <AcUnitIcon />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
