import { isNumeric, isEmail, isDate } from 'validator';
import phone from 'phone';
import { STRING_T, NUMBER_T, EMAIL_T, DATE_T } from './constants';

const stringExists = (input) => input && String(input).length;
const checkIfNumber = (input) => input && isNumeric(input + '');
const checkIfEmail = (input) => input && isEmail(input + '');
const checkIfDate = (input) => input && isDate(input);
const checkIfPhone = (input) => input && phone(input).length > 0;

const validatorForTypes = {
  [STRING_T]: stringExists,
  [NUMBER_T]: checkIfNumber,
  [EMAIL_T]: checkIfEmail,
  [DATE_T]: checkIfDate,
};

export {
  stringExists,
  checkIfNumber,
  checkIfEmail,
  checkIfDate,
  checkIfPhone,
  validatorForTypes,
};
