import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from '../../router';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};

export default App;
