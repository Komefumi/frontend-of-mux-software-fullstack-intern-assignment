import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import MuiPhoneInput from 'material-ui-phone-number';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import PaperLinkTabs from '../components/PaperLinkTabs';
import DesiredSelect from '../components/DesiredSelect';

import { createField, listFields, createCustomer } from '../api';
import { handlerFromSetter } from '../utils';
import {
  stringExists,
  checkIfDate,
  checkIfEmail,
  checkIfNumber,
  checkIfPhone,
  validatorForTypes,
  checkIfValidStore,
  checkIfValidType,
} from '../validators';
import {
  useFormState,
  useAdditionalFormState,
  useSuccessFlash,
  useErrorFlash,
} from '../hooks';

import {
  // ROUTE_ROOT,
  ROUTE_MAJOR_ADD_INFO,
  ROUTE_MINOR_CUSTOMER,
  ROUTE_MINOR_FIELD,
  STORES_VALUES,
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
        const value = formState[fieldName];
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
                  id='date-picker-dialog'
                  label='Date of Birth'
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
  // const [currentForm, setField] = useFormState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState(new Date());
  const [store, setStore] = useState('');
  const [currentForm, setField, setCurrentFormSeed] = useAdditionalFormState(
    []
  );
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
        // const fieldsWithVal = fields.map((current) => ({
        //   ...current,
        //   value: '',
        //   id: nanoid(),
        // }));

        setPropertyMapForAdditional(fields);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [store, setCurrentFormSeed]);

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
    console.log({ payload, store });

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
  const [store, setStore] = useState('');
  const [chosenType, setChosenType] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const setErrorFlash = useErrorFlash();
  const setSuccessFlash = useSuccessFlash();

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
    createField(store, fieldName, chosenType)
      .then(() => {
        setSuccessFlash(
          `Successfully created field ${fieldName} of type ${chosenType}`
        );
      })
      .catch((err) => {
        console.error(err);
        setErrorFlash(STOCK_ERROR_FLASH);
      });
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <TextField
          id='field-name'
          label='Field Name'
          value={fieldName}
          onChange={handlerFromSetter(setFieldName)}
        />
        <DesiredSelect
          inputLabel='Type'
          selectionData={TYPES}
          control={chosenType}
          onSelect={setChosenType}
        />
        <DesiredSelect
          inputLabel='Store'
          selectionData={STORES}
          control={store}
          onSelect={setStore}
        />
      </div>
      <Typography color='primary' variant='h5'>
        Existing Additional Fields
      </Typography>
      <div>
        <Button
          onClick={submitForm}
          variant='contained'
          color='primary'
          disabled={!isValid}
        >
          Submit
        </Button>
      </div>
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
