import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { fetchData, getSuccessFetchData } from '@actions/data';
import { getLSValue, removeLSValue, setLSValue } from '@utils/storage';
import { LS_KEYS } from '@constants';
import { PAGES } from '@constants/pages';
import { Spinner } from '@components';

import { useAppState } from '@context/Provider';

const Public: FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Public;
