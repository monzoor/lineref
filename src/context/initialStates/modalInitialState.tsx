import { DIALOGS as DIALOGS_NAMES } from '@constants/dialogs';

const initialDialogState = {
  isOpen: false,
  isHided: false,
  data: {},
};

export const setInitialValues = () => {
  const state: any = {
    modalOpened: false,
  };

  Object.values(DIALOGS_NAMES).forEach((name: string) => {
    state[name] = {
      ...initialDialogState,
    };
  });

  return state;
};

const initialState = setInitialValues();

export default initialState;
