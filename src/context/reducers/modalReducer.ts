import { DIALOG } from '@actions';
import { DIALOGS as DIALOGS_NAMES } from '@constants/dialogs';

import initialDialogState, {
  setInitialValues,
} from '@context/initialStates/modalInitialState';

interface IModalOpened {
  [key: string]: any;
}

const isModalOpened = (state: IModalOpened) =>
  Object.values(DIALOGS_NAMES).some(
    (dialogName: string) => state[dialogName].isOpen,
  );

interface IStateOnDialogOpen {
  [key: string]: any;
}

const onDialogOpen = (
  state: IStateOnDialogOpen,
  dialogName: string,
  data: any,
) => {
  let newState: any = {};

  Object.values(DIALOGS_NAMES).forEach((name: string) => {
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

interface IStateOnDialogClose {
  [key: string]: any;
}
const onDialogClose = (state: IStateOnDialogClose, dialogName: string) => {
  let newState: any = {};

  Object.values(DIALOGS_NAMES).forEach((name: string) => {
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

const modalReducer = (state: IReducerState, action: IReducerAction) => {
  switch (action.type) {
    case DIALOG.OPEN:
      return {
        modal: { ...onDialogOpen(state, action.name, action.data) },
        modalOpened: true,
      };

    case DIALOG.CLOSE:
      const newState = {
        ...state,
        ...onDialogClose(state, action.name),
      };

      return {
        modal: { ...newState },
        modalOpened: isModalOpened(newState),
      };

    case DIALOG.CLOSE_ALL:
      return {
        ...state,
        modal: { ...setInitialValues() },
      };

    default:
      return state;
  }
};

export default modalReducer;
