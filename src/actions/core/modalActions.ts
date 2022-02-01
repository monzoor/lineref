import { DIALOG } from '..';

export const openDialog = (name: string, data = {}) => ({
  type: DIALOG.OPEN,
  name,
  data,
});

export const closeDialog = (name: string) => ({
  type: DIALOG.CLOSE,
  name,
});

export const closeAllDialogs = () => ({
  type: DIALOG.CLOSE_ALL,
});
