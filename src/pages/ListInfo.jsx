import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { isDate } from 'validator';

import DesiredSelect from '../components/DesiredSelect';

import {
  useSuccessFlash,
  useErrorFlash,
  useDialogSetter,
  useDialogClose,
} from '../hooks';
import { getCustomers, getCustomerCount, deleteCustomer } from '../api';
import { genEmptyFieldData } from '../utils';

import { STORES, STORES_VALUES, STOCK_ERROR_FLASH } from '../constants';

const BasicPagination = ({ pages, onChange }) => {
  return (
    <Grid item sm={12}>
      <Pagination count={pages} onChange={onChange} />
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);
  const [customerList, setCustomerList] = useState([]);
  const [emptyFieldDataForStore, setEmptyFieldDataForStore] = useState({});
  const [recheckSwitch, setRecheckSwitch] = useState(false);
  const dialogSetter = useDialogSetter();
  const dialogClose = useDialogClose();
  const setSuccessFlash = useSuccessFlash();
  const setFailureFlash = useErrorFlash();

  useEffect(() => {
    getCustomerCount(currentStore)
      .then(({ customerCount }) => {
        setPageCount(Math.ceil(customerCount / 10));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentStore]);

  useEffect(() => {
    if (!pageCount) return;
    if (!currentPage && currentPage !== 0 && pageCount) setCurrentPage(1);
  }, [pageCount, currentPage, recheckSwitch]);

  useEffect(() => {
    genEmptyFieldData(currentStore)
      .then((genData) => {
        setEmptyFieldDataForStore(genData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentStore, recheckSwitch]);

  useEffect(() => {
    getCustomers(currentStore, { limit: 10, skip: (currentPage - 1) * 10 })
      .then((data) => {
        setCustomerList(data.customers);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentPage, currentStore, recheckSwitch]);

  const onPageChange = (_event, number) => {
    setCurrentPage(number);
  };

  return (
    <Grid container direction='column'>
      {customerList.map((current, index) => {
        const onClose = dialogClose;
        const onConfirm = () => {
          deleteCustomer(currentStore, current.email)
            .then(() => {
              setSuccessFlash('Successfully deleted customer');
              dialogClose();
              setRecheckSwitch(!recheckSwitch);
            })
            .catch((err) => {
              console.error(err);
              setFailureFlash(STOCK_ERROR_FLASH);
              dialogClose();
            });
        };
        return (
          <Grid
            key={current.email}
            item
            style={{
              marginBottom: '0.1em',
              marginTop: index === 0 ? '0.1em' : null,
            }}
          >
            <Card style={{ padding: '1em' }}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  container
                  style={{ justifyContent: 'flex-end' }}
                >
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => {
                      dialogSetter({
                        title: 'Delete customer ' + current.email + '?',
                        body:
                          'This operation cannot be undone and the deleted customer can only be manually re-entered',
                        onConfirm,
                        onCancel: onClose,
                      });
                    }}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  First Name: {current.firstName}
                </Grid>
                <Grid item xs={12}>
                  Last Name: {current.lastName}
                </Grid>
                <Grid item xs={12}>
                  Email: {current.email}
                </Grid>
                <Grid item xs={12}>
                  Address: {current.address}
                </Grid>
                <Grid item xs={12}>
                  Phone: {current.phone}
                </Grid>
                <Grid item xs={12}>
                  Birthday: {new Date(current.birthday).toDateString()}
                </Grid>
                <Grid item xs={12}>
                  Store: {current.store}
                </Grid>
                <Grid item container xs={12}>
                  {typeof current.additionalFields === 'object' &&
                    Object.keys({
                      ...emptyFieldDataForStore,
                      ...current.additionalFields,
                    }).map((fieldName) => {
                      let value = current.additionalFields[fieldName];
                      const dateVal = new Date(value);
                      const validDate = isDate(dateVal);
                      if (validDate) value = dateVal.toDateString();

                      return (
                        <Grid key={fieldName} item xs={12}>
                          {fieldName}: {value}
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        );
      })}
      {!!pageCount && (
        <BasicPagination
          pages={pageCount}
          page={currentPage}
          onChange={onPageChange}
        />
      )}
    </Grid>
  );
};

const ListInfo = () => {
  const [currentStore, setCurrentStore] = useState(STORES_VALUES[0]);
  const classes = useStyles();

  return (
    <Grid container direction='column'>
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
        <CustomerListing currentStore={currentStore} />
      </Grid>
    </Grid>
  );
};

export default ListInfo;
