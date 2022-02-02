import { getLoadingState } from '@utils/store';

const initialDataState = {
  data: [],
  ...getLoadingState(),
};

export default initialDataState;
