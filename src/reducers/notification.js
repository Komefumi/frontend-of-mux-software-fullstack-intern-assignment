import {
  SET_FLASH_MESSAGE,
  UNSET_FLASH_MESSAGE,
  SET_DIALOG,
  UNSET_DIALOG,
} from '../constants';

const initialState = {
  flashMessage: null,
  severity: null,
  dialog: {
    title: null,
    body: null,
    onConfirm: null,
    onCancel: null,
  },
};

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FLASH_MESSAGE:
      return {
        ...state,
        flashMessage: action.payload.message,
        severity: action.payload.severity,
      };
    case UNSET_FLASH_MESSAGE:
      return { ...state, flashMessage: null, severity: null };
    case SET_DIALOG:
      return { ...state, dialog: action.payload };
    case UNSET_DIALOG:
      return { ...state, dialog: { ...initialState.dialog } };
    default:
      return state;
  }
}

export default notificationReducer;
