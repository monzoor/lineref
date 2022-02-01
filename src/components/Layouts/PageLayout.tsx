import { FC } from 'react';
import Header from '../Header';

const Page: FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Page;
