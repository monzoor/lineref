import { GlobalProvider } from '@context/Provider';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from '../../router';

const App: FC = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routers />
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default App;
