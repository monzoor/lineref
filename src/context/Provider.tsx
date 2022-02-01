import { FC, createContext, useReducer } from 'react';

import modalInitialState from './initialStates/modalInitialState';

import modalReducer from './reducers/modalReducer';

export const GlobalContext = createContext({});

export const GlobalProvider: FC = ({ children }) => {
  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    modalInitialState,
  );

  return (
    <GlobalContext.Provider
      value={{
        modalState,
        modalDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
