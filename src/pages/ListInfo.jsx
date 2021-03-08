import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Card,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Switch, Route, Redirect } from 'react-router-dom';

import PaperLinkTabs from '../components/PaperLinkTabs';
import DesiredSelect from '../components/DesiredSelect';

import { getCustomers, getCustomerCount } from '../api';

import {
  // ROUTE_ROOT,
  ROUTE_MAJOR_LIST_INFO,
  ROUTE_MINOR_CUSTOMER,
  ROUTE_MINOR_FIELD,
  STORES,
  STORES_VALUES,
  // ROUTE_MINOR_ADD_FIELD,
} from '../constants';

const ROUTE_LIST_CUSTOMERS = `${ROUTE_MAJOR_LIST_INFO}/${ROUTE_MINOR_CUSTOMER}/`;
const ROUTE_LIST_FIELDS = `${ROUTE_MAJOR_LIST_INFO}/${ROUTE_MINOR_FIELD}/`;

const BasicPagination = ({ pages }) => {
  return (
    <Grid item sm={12}>
      <Pagination count={pages} />
    </Grid>
  );
};

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

const CustomerListing = ({ currentStore }) => {
  const classes = useStyles();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    getCustomerCount(currentStore)
      .then(({ customerCount }) => {
        setPageCount(Math.ceil(customerCount / 10));
      })
      .catch((err) => {
        console.error(err);
      });
  });

  useEffect(() => {
    if (!pageCount) return;
    if (!currentPage && currentPage !== 0 && pageCount) setCurrentPage(1);
  }, [pageCount, currentPage]);

  useEffect(() => {
    getCustomers(currentStore, { limit: 10, skip: (currentPage - 1) * 10 })
      .then((data) => {
        console.log(data);
        setCustomerList(data.customers);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentPage, currentStore]);

  return (
    <div className={classes.root}>
      {customerList.map((current) => {
        console.log(current);
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.heading}>
                {current.email} - {current.firstName} {current.lastName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item sm={2}>
                  Phone: +{current.phone}
                </Grid>
                <Grid item sm={2}>
                  Birthday: {current.birthday}
                </Grid>
                <Grid item container sm={12}>
                  {typeof current.additionalFields === 'object' &&
                    Object.keys(current.additionalFields).map((key) => (
                      <Grid item sm={2}>
                        {key}: current.additionalFields[key]
                      </Grid>
                    ))}
                </Grid>
              </Grid>
              {/* <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography> */}
            </AccordionDetails>
          </Accordion>
        );
      })}
      {!!pageCount && <BasicPagination pages={pageCount} />}
    </div>
  );
};

const labelWithRouteList = [
  { label: 'List Customers', route: ROUTE_MINOR_CUSTOMER },
  { label: 'List Fields', route: ROUTE_MINOR_FIELD },
];

const ListInfo = () => {
  const [currentStore, setCurrentStore] = useState(STORES_VALUES[0]);
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
            component={() => <CustomerListing currentStore={currentStore} />}
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
