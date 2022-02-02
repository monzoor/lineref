import { DIALOGS as DIALOGS_NAMES } from '@constants/dialogs';

const initialDialogState = {
  isOpen: false,
  isHided: false,
  data: {},
};

interface IState {
  [key: string]: any;
}

export const setInitialValues = () => {
  const state: IState = {
    modalOpened: false,
  };

  Object.values(DIALOGS_NAMES).forEach((name: keyof IState) => {
    state[name] = {
      ...initialDialogState,
    };
  });

  return state;
};

const modalInitialState = setInitialValues();

export default modalInitialState;
