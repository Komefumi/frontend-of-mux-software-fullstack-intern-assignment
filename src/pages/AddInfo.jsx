import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
} from '@material-ui/core';
import MuiPhoneInput from 'material-ui-phone-number';
import { makeStyles } from '@material-ui/core/styles';

import PaperLinkTabs from '../components/PaperLinkTabs';

import {
  // ROUTE_ROOT,
  ROUTE_MAJOR_ADD_INFO,
  ROUTE_MINOR_CUSTOMER,
  ROUTE_MINOR_FIELD,
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

// const STORES = ['electronics', 'toys'];
const STORES = [
  { label: 'Electronics Store', value: 'electronics' },
  { label: 'Toy Store', value: 'toys' },
];

const TYPES = [
  { label: 'String', value: 'string' },
  { label: 'Number', value: 'number' },
  { label: 'Email', value: 'email' },
  { label: 'Date', value: 'date' },
];

const DesiredSelect = ({ inputLabel, selectionData, control, onSelect }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='demo-simple-select-label'>{inputLabel}</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={control}
        onChange={({ target: { value } }) => {
          // setStore(value);
          onSelect(value);
        }}
      >
        {selectionData.map(({ label, value }) => (
          <MenuItem key={label + '-' + value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const AddCustomer = () => {
  const classes = useStyles();
  const [store, setStore] = useState('');

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <TextField id='first-name' label='First Name' />
        <TextField id='last-name' label='Last Name' />
      </div>
      <div>
        <TextField
          style={{ width: '90%' }}
          id='address'
          label='Address'
          multiline
          rowsMax={5}
          fullWidth={true}
        />
      </div>
      <div>
        <MuiPhoneInput
          id='phone-number'
          defaultCountry='in'
          label='Phone Number'
        />
      </div>
      <div>
        <DesiredSelect
          inputLabel='Store'
          selectionData={STORES}
          control={store}
          onSelect={setStore}
        />
      </div>
      <Typography color='primary' variant='h5'>
        Additional Fields
      </Typography>
      <div>
        <Button variant='contained' color='primary'>
          Primary
        </Button>
      </div>
    </form>
  );
};

const AddField = () => {
  const classes = useStyles();
  // const [store, setStoreOnChange] = useStore();
  const [store, setStore] = useState('');
  const [chosenType, setChosenType] = useState('');

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <TextField id='field-name' label='Field Name' />
        {/* <TextField id='field-type' label='Field Type' /> */}
        <DesiredSelect
          inputLabel='Type'
          selectionData={TYPES}
          control={chosenType}
          onSelect={setChosenType}
        />
        {/* <StoreSelect control={store} onStoreSelect={setStore} /> */}
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
