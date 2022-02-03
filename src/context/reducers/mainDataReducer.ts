import { MAIN_DATA } from '@actions';
import { prepareSelectValues } from '@utils';
import { getErrorState, getReadyState } from '@utils/store';

const mainDataReducer = (state: IReducerState, action: IReducerAction) => {
  switch (action.type) {
    case MAIN_DATA.SUCCESS:
      return {
        ...state,
        products: {
          items: {
            ...getReadyState(action.data),
          },
          availableItems: prepareSelectValues(
            action.data.filter((item: any) => item.availability),
          ),
          unAvailableItems: prepareSelectValues(
            action.data.filter(
              (item: any) => !item.availability && item.durability !== 0,
            ),
          ),
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
