import { useDispatch } from 'react-redux';
import {
  SET_FLASH_MESSAGE,
  SET_DIALOG,
  ERROR,
  SUCCESS,
  UNSET_DIALOG,
} from './constants';

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

export { useSuccessFlash, useErrorFlash, useDialogSetter, useDialogClose };
