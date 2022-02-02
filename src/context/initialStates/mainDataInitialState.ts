import { getLoadingState } from '@utils/store';

const initialDataState = {
  rawData: {
    data: [],
    ...getLoadingState(),
  },
};

export default initialDataState;
