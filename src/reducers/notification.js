import { SET_FLASH_MESSAGE, UNSET_FLASH_MESSAGE } from '../constants';

const initialState = {
  flashMessage: null,
  severity: null,
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
    default:
      return state;
  }
}

export default notificationReducer;
