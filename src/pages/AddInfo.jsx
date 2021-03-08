import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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

import { createField } from '../api';
import { handlerFromSetter } from '../utils';
import { useFormState } from '../hooks';

import {
  // ROUTE_ROOT,
  ROUTE_MAJOR_ADD_INFO,
  ROUTE_MINOR_CUSTOMER,
  ROUTE_MINOR_FIELD,
  STORES,
  TYPES,
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
}));

{
  /* {currentForm.map(
          ({
            fieldType,
            fieldName,
            fieldLabel,
            SpecificElement,
            value,
            properties,
          }) => {
            let RenderingElement = null;
            if (SpecificElement) {
              RenderingElement = SpecificElement;
            } else {
              switch (fieldType) {
                case STRING_T:
                  RenderingElement = TextField;
                  break;
                case EMAIL_T:
                  RenderingElement = TextField;
                  break;
                case NUMBER_T:
                  RenderingElement = TextField;
                case DATE_T:
                  RenderingElement = DateFi;
              }
            }
            return <Grid item xs={6} sm={3}></Grid>;
          }
        )} */
}

const AddCustomer = () => {
  const classes = useStyles();
  // const [currentForm, setField] = useFormState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState();
  const [store, setStore] = useState('');

  const handleDobChange = (date) => {
    setDob(date);
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
              style={{ width: '90%' }}
              id='address'
              label='Address'
              multiline
              rowsMax={5}
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
        </Grid>
        <Typography color='primary' variant='h5'>
          Additional Fields
        </Typography>
        <div>
          <Button variant='contained' color='primary'>
            Primary
          </Button>
        </div>
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
        <Button variant='contained' color='primary'>
          Primary
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
