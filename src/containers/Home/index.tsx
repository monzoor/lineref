import { FC, useEffect } from 'react';

import { openDialog } from '@actions/core/modalActions';
import { Page, Spinner } from '@components';
import { LS_KEYS } from '@constants';
import { DIALOGS } from '@constants/dialogs';
import { useAppState } from '@context/Provider';
import { getLSValue, removeLSValue, setLSValue } from '@utils/storage';

import Lists from './List';
import { fetchData, getSuccessFetchData } from '@actions/data';
import { isLoading } from '@utils/store';
import { PAGES } from '@constants/pages';

const Home: FC = () => {
  const [state, dispatch] = useAppState();

  const triggerModal = () => {
    dispatch(openDialog(DIALOGS.BOOK));
  };

  useEffect(() => {
    const getData = getLSValue(LS_KEYS.USER_DATA);

    if (!getData) {
      const fetchItems = async () => {
        try {
          const data = await fetchData(dispatch);
          setLSValue(LS_KEYS.USER_DATA, data[0 as keyof typeof data]);
        } catch (error) {
          removeLSValue(LS_KEYS.USER_DATA);

          window.location.assign(PAGES.ERROR);
        }
      };
      fetchItems();
    } else {
      dispatch(getSuccessFetchData(getData));
    }
  }, [dispatch]);

  if (isLoading(state.products.rawData)) {
    return <Spinner />;
  }

  console.log('=====red');
  return (
    <Page>
      <div className="container mx-auto mt-5">
        <div className="flex flex-col">
          <button onClick={triggerModal}>Open Modal</button>

          <Lists />
        </div>
      </div>
    </Page>
  );
};

export default Home;
