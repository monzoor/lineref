import { FC } from 'react';
import Header from '../Header';
import { Dialog } from '@components';

const Page: FC = ({ children }) => {
  return (
    <>
      <Header />
      <Dialog />
      {children}
    </>
  );
};

export default Page;
