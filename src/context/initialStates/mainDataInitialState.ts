import { getLoadingState } from '@utils/store';

const initialDataState = {
  items: {
    data: [],
    ...getLoadingState(),
  },
  availableItems: [],
  unAvailableItems: [],
};

export default initialDataState;
