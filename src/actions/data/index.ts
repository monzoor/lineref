import { MAIN_DATA } from '../';
const dataSet = ['data'];

interface Action {
  type: string;
  data?: any;
}

export const getSuccessFetchData = (data: any): Action => ({
  type: MAIN_DATA.SUCCESS,
  data,
});

export const getErrorFetchData = (): Action => ({
  type: MAIN_DATA.FAIL,
});

export const fetchData = async (dispatch: (data: any) => void) => {
  const data = await Promise.all(
    dataSet.map(async (item: string) => {
      const content = await import(`../../data/${item}.json`);
      return content.default;
    }),
  ).catch(() => {
    dispatch(getErrorFetchData());
  });
  dispatch(getSuccessFetchData(data));
  return data;
};
