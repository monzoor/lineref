import { GlobalProvider } from '@context/Provider';
import { initialState, combineReducers } from '@context/reducers';
import modalReducer from '@context/reducers/modalReducer';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from '../../router';

const appReducers = combineReducers({
  modal: modalReducer,
});

const App: FC = () => {
  return (
    <BrowserRouter>
      <GlobalProvider reducer={appReducers} initialState={initialState}>
        <Routers />
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default App;
