import { FC, useEffect, useState } from 'react';

import { openDialog } from '@actions/core/modalActions';
import { Page } from '@components';
import { LS_KEYS } from '@constants';
import { DIALOGS } from '@constants/dialogs';
import { useAppState } from '@context/Provider';
import { getLSValue } from '@utils/storage';

import Lists from './List';

const Home: FC = () => {
  const [carList, setCarList] = useState([]);

  const [, dispatch] = useAppState();

  const triggerModal = () => {
    dispatch(openDialog(DIALOGS.BOOK));
  };

  useEffect(() => {
    const data = getLSValue(LS_KEYS.USER_DATA);

    setCarList(data);
  }, []);

  return (
    <Page>
      <div className="container mx-auto mt-5">
        <div className="flex flex-col">
          <button onClick={triggerModal}>Open Modal</button>

          <Lists carList={carList} />
        </div>
      </div>
    </Page>
  );
};

export default Home;
