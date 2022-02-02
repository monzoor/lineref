import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { fetchData, getSuccessFetchData } from '@actions/data';
import { getLSValue, removeLSValue, setLSValue } from '@utils/storage';
import { LS_KEYS } from '@constants';
import { PAGES } from '@constants/pages';
import { Spinner } from '@components';

import { useAppState } from '@context/Provider';

const Public: FC = () => {
  // const [loading, setLoading] = useState(true);

  // const [state, dispatch] = useAppState();
  // console.log('==sdsdsd==', state);

  // useEffect(() => {
  //   fetchData(dispatch);
  //   // const fetchItems = async () => {
  //   //   try {
  //   //     const data = await fetchData();
  //   //     setLoading(false);
  //   //     // setLSValue(LS_KEYS.USER_DATA, data[0]);
  //   //   } catch (error) {
  //   //     removeLSValue(LS_KEYS.USER_DATA);
  //   //     window.location.assign(PAGES.ERROR);
  //   //   }
  //   // };
  //   // if (!getLSValue(LS_KEYS.USER_DATA)) {
  //   //   fetchItems();
  //   // } else {
  //   //   setLoading(false);
  //   // }
  // }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Public;
