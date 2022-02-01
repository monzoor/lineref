import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './config';

const Routers: FC = () => {
  const element = useRoutes(routes);

  return <>{element}</>;
};

export default Routers;
