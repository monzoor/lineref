import { MAIN_DATA } from '@actions';
import { getErrorState, getReadyState } from '@utils/store';

const mainDataReducer = (state: IReducerState, action: IReducerAction) => {
  switch (action.type) {
    case MAIN_DATA.SUCCESS:
      return {
        ...state,
        items: getReadyState(action.data),
      };

    case MAIN_DATA.FAIL:
      return {
        ...state.items,
        items: getErrorState(),
      };

    // case actionTypes.GET_MAIN_DATA_SUCCESS:
    //   return getReadyState(state, action.data);
    // case actionTypes.GET_MAIN_DATA_FAIL:
    //   return getErrorState(state, action.data);
    default:
      return state;
  }
};

export default mainDataReducer;
