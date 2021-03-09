import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import MuiPhoneInput from 'material-ui-phone-number';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import PaperLinkTabs from '../components/PaperLinkTabs';
import DesiredSelect from '../components/DesiredSelect';

import { createField, listFields, createCustomer, deleteField } from '../api';
import { handlerFromSetter } from '../utils';
import {
  stringExists,
  checkIfDate,
  checkIfEmail,
  checkIfPhone,
  checkIfValidStore,
  checkIfValidType,
} from '../validators';
import {
  useSuccessFlash,
  useErrorFlash,
  useDialogSetter,
  useDialogClose,
} from '../hooks';

import {
  // ROUTE_ROOT,
  ROUTE_MAJOR_ADD_INFO,
  ROUTE_MINOR_CUSTOMER,
  ROUTE_MINOR_FIELD,
  STORES_VALUES,
  BLACKLIST_CUSTOM_FIELD_NAMES_IN_LOWERCASE,
  STORES,
  TYPES,
  STRING_T,
  EMAIL_T,
  NUMBER_T,
  DATE_T,
  SET_FLASH_MESSAGE,
  STOCK_ERROR_FLASH,
  // ROUTE_MINOR_ADD_FIELD,
} from '../constants';

const ROUTE_ADD_CUSTOMER = `${ROUTE_MAJOR_ADD_INFO}/${ROUTE_MINOR_CUSTOMER}/`;
const ROUTE_ADD_FIELD = `${ROUTE_MAJOR_ADD_INFO}/${ROUTE_MINOR_FIELD}/`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  additionalFieldsSeperatorTitle: {
    marginTop: theme.spacing(3),
    // marginBottom: theme.spacing(1),
  },
  fieldDeletionButton: {
    marginLeft: theme.spacing(3),
  },
  additionalFieldsTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  addFieldGrid: {
    marginBottom: theme.spacing(1),
  },
}));

const AdditionalFields = ({
  propertyMap,
  setDataForParent,
  dataRetrievalSignal,
}) => {
  const [formState, setFormState] = useState({});

  useEffect(() => {
    if (propertyMap && Object.keys(propertyMap).length > 0) {
      const initialFormState = Object.keys(propertyMap).reduce(
        (accum, currKey) => ({ ...accum, [currKey]: '' }),
        {}
      );
      setFormState({ ...initialFormState });
    }
  }, [propertyMap]);

  useEffect(() => {
    if (!dataRetrievalSignal) return;
    setDataForParent(formState);
  }, [dataRetrievalSignal, formState, setDataForParent]);
  return (
    <>
      {Object.keys(propertyMap).map((fieldName, index) => {
        const fieldType = propertyMap[fieldName];
        const onChange = (e) => {
          setFormState({ ...formState, [fieldName]: e.target.value });
          setDataForParent(formState);
        };
        let Inner = null;
        switch (fieldType) {
          case STRING_T:
            Inner = () => (
              <TextField
                label={fieldName}
                key={fieldName}
                // value={value}
                onChange={onChange}
              />
            );
            break;
          case NUMBER_T:
            Inner = () => (
              <TextField
                label={fieldName}
                key={fieldName}
                // value={value}
                onChange={onChange}
                type='number'
              />
            );
            break;
          case EMAIL_T:
            Inner = () => (
              <TextField
                label={fieldName}
                key={fieldName}
                // value={value}
                onChange={onChange}
                type='email'
              />
            );
            break;
          case DATE_T:
            Inner = () => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin='normal'
                  // id='date-picker-dialog'
                  label={fieldName}
                  format='MM/dd/yyyy'
                  key={fieldName}
                  // value={value}
                  onChange={(date) => {
                    setFormState({ ...formState, [fieldName]: date });
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            );
            break;
          default:
            Inner = () => null;
        }

        return Inner();
      })}
    </>
  );
};

const AddCustomer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState(new Date());
  const [store, setStore] = useState('');

  const [formValid, setFormValid] = useState(false);
  const [propertyMapForAdditional, setPropertyMapForAdditional] = useState(
    null
  );
  const [additionalDataRetSignal, setAdditionalDataRetSignal] = useState(false);
  const [additionalData, setAdditionalData] = useState(null);

  useEffect(() => {
    if (STORES_VALUES.indexOf(store.toLowerCase()) === -1) return;
    listFields(store)
      .then((data) => {
        const { fields } = data;

        setPropertyMapForAdditional(fields);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [store]);

  useEffect(() => {
    const anyStringInvalid = [firstName, lastName, address].some(
      (current) => !stringExists(current)
    );
    if (
      anyStringInvalid ||
      !checkIfDate(dob) ||
      !checkIfPhone(phone) ||
      !checkIfEmail(email) ||
      STORES_VALUES.indexOf(store) === -1
    ) {
      setFormValid(false);
      return;
    }

    setAdditionalDataRetSignal();
    setFormValid(true);
  }, [
    firstName,
    lastName,
    email,
    address,
    phone,
    dob,
    store,
    setAdditionalDataRetSignal,
  ]);

  useEffect(() => {
    if (additionalDataRetSignal) setAdditionalDataRetSignal(false);
  }, [additionalDataRetSignal]);

  const handleDobChange = (date) => {
    setDob(date);
  };

  const submitForm = () => {
    let payload = {
      firstName,
      lastName,
      email,
      address,
      phone,
      birthday: dob,
      additionalFields: {},
    };
    payload = { ...payload, additionalFields: additionalData };

    createCustomer(store, payload)
      .then(() => {
        dispatch({
          type: SET_FLASH_MESSAGE,
          payload: {
            message: 'Customer successfully created!',
            severity: 'success',
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_FLASH_MESSAGE,
          payload: {
            message:
              'Oh no! An unexpected error has occured... please try again later',
            severity: 'error',
          },
        });
        console.error(err);
      });
  };

  return (
    <Grid container wrap='wrap'>
      <form className={classes.root} noValidate autoComplete='off'>
        <Grid container wrap='wrap'>
          <Grid item sm={12}>
            <TextField
              id='first-name'
              label='First Name'
              value={firstName}
              onChange={handlerFromSetter(setFirstName)}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              id='last-name'
              label='Last Name'
              value={lastName}
              onChange={handlerFromSetter(setLastName)}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              id='email'
              label='Email'
              value={email}
              onChange={handlerFromSetter(setEmail)}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              style={{ width: '90%' }}
              id='address'
              label='Address'
              multiline
              rowsMax={5}
              value={address}
              onChange={handlerFromSetter(setAddress)}
            />
          </Grid>
          <Grid item sm={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin='normal'
                id='date-picker-dialog'
                label='Date of Birth'
                format='MM/dd/yyyy'
                value={dob}
                onChange={handleDobChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item sm={12}>
            <MuiPhoneInput
              id='phone-number'
              defaultCountry='in'
              label='Phone Number'
              value={phone}
              onChange={setPhone}
            />
          </Grid>
          <Grid item sm={12}>
            <DesiredSelect
              inputLabel='Store'
              selectionData={STORES}
              control={store}
              onSelect={setStore}
            />
          </Grid>
          <Grid className={classes.additionalFieldsSeperatorTitle} item sm={12}>
            <Typography color='primary' variant='h5'>
              Additional Fields
            </Typography>
          </Grid>
          {propertyMapForAdditional && (
            <AdditionalFields
              propertyMap={propertyMapForAdditional}
              setDataForParent={setAdditionalData}
              dataRetrievalSignal={additionalDataRetSignal}
            />
          )}
          <Grid item sm={12}>
            <Button
              onClick={submitForm}
              variant='contained'
              color='primary'
              disabled={!formValid}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

const AddField = () => {
  const classes = useStyles();
  // const [store, setStoreOnChange] = useStore();
  const [store, setStore] = useState(STORES_VALUES[0]);
  const [chosenType, setChosenType] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [fieldMap, setFieldMap] = useState({});
  const [triggerFieldsRetSwitch, setTriggerFieldsRetSwitch] = useState(false);
  const setErrorFlash = useErrorFlash();
  const setSuccessFlash = useSuccessFlash();
  const dialogSetter = useDialogSetter();
  const dialogClose = useDialogClose();

  const retFieldsAgain = () => {
    setTriggerFieldsRetSwitch(!triggerFieldsRetSwitch);
  };

  useEffect(() => {
    listFields(store)
      .then((data) => {
        const { fields } = data;
        setFieldMap(fields);
      })
      .catch((err) => {
        console.error(err);
        setErrorFlash(
          'Failed to retrieve field data at this time... please try again later'
        );
      });
  }, [store, setErrorFlash, triggerFieldsRetSwitch]);

  useEffect(() => {
    if (
      stringExists(fieldName) &&
      checkIfValidStore(store) &&
      checkIfValidType(chosenType)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [fieldName, store, chosenType]);

  const submitForm = () => {
    if (
      BLACKLIST_CUSTOM_FIELD_NAMES_IN_LOWERCASE.indexOf(
        fieldName.toLowerCase()
      ) !== -1
    ) {
      return setErrorFlash('Additional Field cannot be that of a standard one');
    }
    createField(store, fieldName, chosenType)
      .then(() => {
        setSuccessFlash(
          `Successfully created field ${fieldName} of type ${chosenType}`
        );
        retFieldsAgain();
      })
      .catch((err) => {
        console.error(err);
        setErrorFlash(STOCK_ERROR_FLASH);
      });
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <Grid container>
        <Grid item xs={12} md={3}>
          <TextField
            id='field-name'
            label='Field Name'
            value={fieldName}
            onChange={handlerFromSetter(setFieldName)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DesiredSelect
            inputLabel='Type'
            selectionData={TYPES}
            control={chosenType}
            onSelect={setChosenType}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <DesiredSelect
            inputLabel='Store'
            selectionData={STORES}
            control={store}
            onSelect={setStore}
          />
        </Grid>
        <Grid className={classes.additionalFieldsTitle} item xs={12}>
          <Typography color='primary' variant='h5'>
            Existing Additional Fields
          </Typography>
        </Grid>

        {Object.keys(fieldMap).map((fieldName) => {
          return (
            <Grid
              key={fieldName}
              item
              xs={12}
              sm={10}
              md={8}
              className={classes.addFieldGrid}
            >
              {fieldName}: {fieldMap[fieldName]}{' '}
              <Button
                variant='contained'
                color='secondary'
                size='small'
                className={classes.fieldDeletionButton}
                onClick={() => {
                  const desc = `${fieldName} of type ${fieldMap[fieldName]}`;
                  dialogSetter({
                    title: `Delete field ${desc}?`,
                    body:
                      'This operation cannot be undone and the deleted field can only be manually re-entered',
                    onConfirm: () => {
                      deleteField(store, fieldName)
                        .then(() => {
                          setSuccessFlash(`Successfully deleted ${desc}`);
                          retFieldsAgain();
                          dialogClose();
                        })
                        .catch((err) => {
                          console.error(err);
                          setErrorFlash(STOCK_ERROR_FLASH);
                        });
                    },
                    onCancel: dialogClose,
                  });
                }}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <Button
            onClick={submitForm}
            variant='contained'
            color='primary'
            disabled={!isValid}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const MINOR_ROUTES_WITH_LABELS = [
  { label: 'Add Customer', route: ROUTE_MINOR_CUSTOMER },
  { label: 'Add Field', route: ROUTE_MINOR_FIELD },
];

const AddInfo = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        {/* <AddInfoTabs /> */}
        <PaperLinkTabs
          majorRoute={ROUTE_MAJOR_ADD_INFO}
          labelWithMinorRouteList={MINOR_ROUTES_WITH_LABELS}
        />
      </Grid>
      <Grid item>
        <Switch>
          <Redirect
            exact
            from={`${ROUTE_MAJOR_ADD_INFO}`}
            to={`${ROUTE_ADD_CUSTOMER}`}
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
