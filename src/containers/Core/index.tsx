import { GlobalProvider } from '@context/Provider';
import { initialState, combineReducers } from '@context/reducers';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from '../../router';

import modalReducer from '@context/reducers/modalReducer';
import mainDataReducer from '@context/reducers/mainDataReducer';

const appReducers = combineReducers({
  modal: modalReducer,
  products: mainDataReducer,
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
