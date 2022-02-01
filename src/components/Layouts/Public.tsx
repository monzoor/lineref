import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { fetchData } from '@actions';
import { getLSValue, removeLSValue, setLSValue } from '@utils/storage';
import { LS_KEYS } from '@constants';
import { PAGES } from '@constants/pages';
import { Spinner } from '@components';

const Public: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetchData();
        setLoading(false);
        setLSValue(LS_KEYS.USER_DATA, data[0]);
      } catch (error) {
        removeLSValue(LS_KEYS.USER_DATA);
        window.location.assign(PAGES.ERROR);
      }
    };

    if (!getLSValue(LS_KEYS.USER_DATA)) {
      fetchItems();
    } else {
      setLoading(false);
    }
  }, []);

  return <>{loading ? <Spinner /> : <Outlet />}</>;
};

export default Public;
