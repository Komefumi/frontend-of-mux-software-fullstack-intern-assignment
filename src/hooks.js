import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import MuiPhoneInput from 'material-ui-phone-number';
import {
  DATE_T,
  EMAIL_T,
  NUMBER_T,
  STRING_T,
  SET_FLASH_MESSAGE,
  SET_DIALOG,
  ERROR,
  SUCCESS,
  UNSET_DIALOG,
} from './constants';

const useFormState = () => {
  const [currentForm, setCurrentForm] = useState(
    [
      {
        fieldType: STRING_T,
        fieldName: 'firstName',
        fieldLabel: 'First Name',
        value: '',
        properties: {},
      },
      {
        fieldType: STRING_T,
        fieldName: 'lastName',
        fieldLabel: 'Last Name',
        value: '',
        properties: {},
      },
      {
        fieldType: EMAIL_T,
        fieldName: 'email',
        fieldLabel: 'Email',
        value: '',
        properties: {},
      },
      {
        fieldType: STRING_T,
        fieldName: 'address',
        fieldLabel: 'Address',
        value: '',
        properties: {
          multiline: true,
          rowsMax: 5,
          fullWidth: true,
        },
      },
      {
        fieldType: NUMBER_T,
        fieldName: 'phone',
        fieldLabel: 'Phone',
        SpecificElement: MuiPhoneInput,
        value: null,
        properties: {},
      },
      {
        fieldType: DATE_T,
        fieldName: 'dob',
        fieldLabel: 'Date of Birth',
        value: '',
        properties: {},
      },
    ].map((current) => ({ ...current, id: nanoid() }))
  );

  const setField = (idToLookFor, val) => {
    const idxOfField = currentForm.indexOf(({ id }) => id === idToLookFor);
    const newForm = currentForm
      .slice()
      .splice(idxOfField, 1, { ...currentForm[idxOfField], value: val });
    setCurrentForm(newForm);
  };

  return [currentForm, setField];
};

/**
 * @param {object} specificationList - Must have items as objects with fields fieldName and fieldType, as well as a value field that could be an empty string
 */
const useAdditionalFormState = (specificationList) => {
  const [currentForm, setCurrentForm] = useState(
    specificationList.map((current) => {
      return { ...current, id: nanoid() };
    })
  );

  const setField = (idToLookFor, val) => {
    const idxOfField = currentForm.indexOf(({ id }) => id === idToLookFor);
    const newForm = currentForm
      .slice()
      .splice(idxOfField, 1, { ...currentForm[idxOfField], value: val });
    setCurrentForm(newForm);
  };

  return [currentForm, setField, setCurrentForm];
};

const useSuccessFlash = () => {
  const dispatch = useDispatch();
  const setSuccessFlash = (flashMessage) => {
    dispatch({
      type: SET_FLASH_MESSAGE,
      payload: { message: flashMessage, severity: SUCCESS },
    });
  };
  return setSuccessFlash;
};

const useErrorFlash = () => {
  const dispatch = useDispatch();
  const setErrorFlash = (flashMessage) => {
    dispatch({
      type: SET_FLASH_MESSAGE,
      payload: { message: flashMessage, severity: ERROR },
    });
  };
  return setErrorFlash;
};

const useDialogSetter = () => {
  const dispatch = useDispatch();
  const setDialog = (payload) => {
    dispatch({
      type: SET_DIALOG,
      payload,
    });
  };
  return setDialog;
};

const useDialogClose = () => {
  const dispatch = useDispatch();
  const closeDialog = () => {
    dispatch({
      type: UNSET_DIALOG,
    });
  };
  return closeDialog;
};

export {
  useFormState,
  useAdditionalFormState,
  useSuccessFlash,
  useErrorFlash,
  useDialogSetter,
  useDialogClose,
};
