import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Public: FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Public;
