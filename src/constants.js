const ROUTE_ROOT = '/';
const ROUTE_MAJOR_ADD_INFO = '/add';
const ROUTE_MAJOR_LIST_INFO = '/list';

const ROUTE_MINOR_CUSTOMER = 'customer';
const ROUTE_MINOR_FIELD = 'field';

const SET_FLASH_MESSAGE = 'SET_FLASH_MESSAGE';
const UNSET_FLASH_MESSAGE = 'UNSET_FLASH_MESSAGE';

const ELECTRONICS = 'electronics';
const TOYS = 'toys';

const STORES_VALUES = [ELECTRONICS, TOYS];

const STORES = [
  { label: 'Electronics Store', value: 'electronics' },
  { label: 'Toy Store', value: 'toys' },
];

const STRING_T = 'string';
const NUMBER_T = 'number';
const EMAIL_T = 'email';
const DATE_T = 'date';

const TYPES = [
  { label: 'String', value: STRING_T },
  { label: 'Number', value: NUMBER_T },
  { label: 'Email', value: EMAIL_T },
  { label: 'Date', value: DATE_T },
];

const TYPES_VALUES = [STRING_T, NUMBER_T, EMAIL_T, DATE_T];

const ERROR = 'error';
const SUCCESS = 'success';

const STOCK_ERROR_FLASH =
  'Oh no, it looks like an unexpected error occured... Please try again later';

export {
  ROUTE_ROOT,
  ROUTE_MAJOR_ADD_INFO,
  ROUTE_MAJOR_LIST_INFO,
  ROUTE_MINOR_CUSTOMER,
  ROUTE_MINOR_FIELD,
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE,
  STORES_VALUES,
  STORES,
  TYPES,
  TYPES_VALUES,
  STRING_T,
  NUMBER_T,
  EMAIL_T,
  DATE_T,
  ERROR,
  SUCCESS,
  STOCK_ERROR_FLASH,
};
