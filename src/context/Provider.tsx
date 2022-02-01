import { FC, createContext, useReducer, useContext } from 'react';

export const GlobalContext = createContext({});

interface IProviderProps {
  reducer: any;
  initialState: any;
}

export const GlobalProvider: FC<IProviderProps> = ({
  reducer,
  initialState = {},
  children,
}) => {
  const value = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useAppState = (): any => {
  return useContext(GlobalContext);
};
