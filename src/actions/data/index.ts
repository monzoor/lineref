import { LS_KEYS } from '@constants';
import { PAGES } from '@constants/pages';
import * as Sentry from '@sentry/react';
import { processNewData } from '@utils';
import { removeLSValue, setLSValue } from '@utils/storage';
import { MAIN_DATA } from '../';
const dataSet = ['data'];

interface Action {
  type: string;
  data?: any;
}

export const getStartFetchData = (): Action => ({
  type: MAIN_DATA.START,
});

export const getSuccessFetchData = (data: any): Action => ({
  type: MAIN_DATA.SUCCESS,
  data,
});

export const getErrorFetchData = (): Action => ({
  type: MAIN_DATA.FAIL,
});

export const fetchData = async (dispatch: (data: any) => void) => {
  const dataFetched: any = await Promise.all(
    dataSet.map(async (item: string) => {
      const content = await import(`../../data/${item}.json`);
      return content.default;
    }),
  ).catch((error) => {
    removeLSValue(LS_KEYS.USER_DATA);
    Sentry.captureException(error);
    window.location.assign(PAGES.ERROR);
    dispatch(getErrorFetchData());
  });

  if (dataFetched.length !== 0) {
    const newDataSet = processNewData(
      dataFetched[0 as keyof typeof dataFetched],
    );
    setLSValue(LS_KEYS.USER_DATA, newDataSet);
    dispatch(getSuccessFetchData(newDataSet));
  }
  return dataFetched;
};
