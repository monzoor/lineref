import { MAIN_DATA } from '@actions';
import { getErrorState, getReadyState } from '@utils/store';

const mainDataReducer = (state: IReducerState, action: IReducerAction) => {
  switch (action.type) {
    case MAIN_DATA.SUCCESS:
      return {
        ...state,
        products: {
          rawData: {
            ...getReadyState(action.data),
          },
        },
      };

    case MAIN_DATA.FAIL:
      return {
        ...state,
        products: getErrorState(),
      };

    default:
      return state;
  }
};

export default mainDataReducer;
