import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Card,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Switch, Route, Redirect } from 'react-router-dom';

import PaperLinkTabs from '../components/PaperLinkTabs';
import DesiredSelect from '../components/DesiredSelect';

import {
  // ROUTE_ROOT,
  ROUTE_MAJOR_LIST_INFO,
  ROUTE_MINOR_CUSTOMER,
  ROUTE_MINOR_FIELD,
  STORES,
  // ROUTE_MINOR_ADD_FIELD,
} from '../constants';

const ROUTE_LIST_CUSTOMERS = `${ROUTE_MAJOR_LIST_INFO}/${ROUTE_MINOR_CUSTOMER}/`;
const ROUTE_LIST_FIELDS = `${ROUTE_MAJOR_LIST_INFO}/${ROUTE_MINOR_FIELD}/`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  selectContainingPanel: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const SimpleAccordion = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography className={classes.heading}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography className={classes.heading}>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel3a-content'
          id='panel3a-header'
        >
          <Typography className={classes.heading}>
            Disabled Accordion
          </Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
};

const labelWithRouteList = [
  { label: 'List Customers', route: ROUTE_MINOR_CUSTOMER },
  { label: 'List Fields', route: ROUTE_MINOR_FIELD },
];

const ListInfo = () => {
  const [currentStore, setCurrentStore] = useState('');
  const classes = useStyles();

  return (
    <Grid container direction='column'>
      <Grid item>
        {/* <AddInfoTabs /> */}
        <PaperLinkTabs
          majorRoute={ROUTE_MAJOR_LIST_INFO}
          labelWithMinorRouteList={labelWithRouteList}
        />
      </Grid>
      <Grid item>
        <Card className={classes.selectContainingPanel}>
          <DesiredSelect
            inputLabel='Store'
            selectionData={STORES}
            control={currentStore}
            onSelect={setCurrentStore}
          />
        </Card>
      </Grid>
      <Grid item>
        <Switch>
          <Redirect
            exact
            from={`${ROUTE_MAJOR_LIST_INFO}`}
            to={`${ROUTE_LIST_CUSTOMERS}`}
          />
          <Route
            path={ROUTE_LIST_CUSTOMERS}
            component={() => <SimpleAccordion currentStore={currentStore} />}
          />
          <Route
            path={ROUTE_LIST_FIELDS}
            component={() => (
              <div currentStore={currentStore}>Fields are us</div>
            )}
          />
        </Switch>
      </Grid>
    </Grid>
  );
};

export default ListInfo;
