import initialDataState from '@context/initialStates/mainDataInitialState';
import modalInitialState from '@context/initialStates/modalInitialState';

const initialState = {
  modal: modalInitialState,
  products: initialDataState,
};

const combineReducers = (reducers: any) => {
  return (state: any, action: any) => {
    return Object.keys(reducers).reduce((acc, prop) => {
      return {
        ...acc,
        ...reducers[prop]({ [prop]: acc[prop] }, action),
      };
    }, state);
  };
};

export { initialState, combineReducers };
