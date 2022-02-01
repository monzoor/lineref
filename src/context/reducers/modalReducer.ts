import { DIALOG } from '@actions';
import { DIALOGS as DIALOGS_NAMES } from '@constants/dialogs';

import initialDialogState, {
  setInitialValues,
} from '@context/initialStates/modalInitialState';

const isModalOpened = (state: any) =>
  Object.values(DIALOGS_NAMES).some((dialogName) => state[dialogName].isOpen);

const onDialogOpen = (state: any, dialogName: string, data: any) => {
  let newState: any = {};

  Object.values(DIALOGS_NAMES).forEach((name) => {
    if (name === dialogName) {
      newState[name] = {
        ...state[name],
        isOpen: true,
        isHided: false,
        data,
      };
    } else {
      newState[name] = {
        ...state[name],
        isHided: true,
      };
    }
  });

  return newState;
};

const onDialogClose = (state: any, dialogName: string) => {
  let newState: any = {};

  Object.values(DIALOGS_NAMES).forEach((name) => {
    if (name === dialogName) {
      newState[name] = {
        ...initialDialogState,
      };
    } else {
      newState[name] = {
        ...state[name],
        isHided: false,
      };
    }
  });

  return newState;
};

const modalReducer = (state: any, action: any) => {
  switch (action.type) {
    case DIALOG.OPEN:
      return {
        ...onDialogOpen(state, action.name, action.data),
        modalOpened: true,
      };

    case DIALOG.CLOSE:
      const newState = {
        ...state,
        ...onDialogClose(state, action.name),
      };

      return {
        ...newState,
        modalOpened: isModalOpened(newState),
      };

    case DIALOG.CLOSE_ALL:
      return {
        ...state,
        ...setInitialValues(),
      };

    default:
      return state;
  }
};

export default modalReducer;
