import { FC, memo, useEffect } from 'react';

import { Page, Spinner, ErrorBoundary } from '@components';
import { LS_KEYS } from '@constants';
import { useAppState } from '@context/Provider';
import { getLSValue } from '@utils/storage';

import Lists from './List';
import { fetchData, getSuccessFetchData } from '@actions/data';
import { isLoading } from '@utils/store';
import ModalItems from './ModalItems';

const Home: FC = () => {
  const [state, dispatch] = useAppState();

  const {
    products: { items },
  } = state;

  useEffect(() => {
    const getData = getLSValue(LS_KEYS.USER_DATA);

    if (!getData) {
      fetchData(dispatch);
    } else {
      dispatch(getSuccessFetchData(getData));
    }
  }, [dispatch]);

  if (isLoading(items)) {
    return <Spinner />;
  }

  return (
    <ErrorBoundary>
      <Page>
        <div className="container mx-auto mt-5">
          <div className="flex flex-col">
            <Lists />

            <ModalItems dispatch={dispatch} />
          </div>
        </div>
      </Page>
    </ErrorBoundary>
  );
};

export default memo(Home);
