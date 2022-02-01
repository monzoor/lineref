import { openDialog } from '@actions/core/modalActions';
import { Page } from '@components';
import { LS_KEYS } from '@constants';
import { DIALOGS } from '@constants/dialogs';
import { GlobalContext } from '@context/Provider';
import { getLSValue } from '@utils/storage';
import { FC, useContext, useEffect, useState } from 'react';
import Lists from './List';

const Home: FC = () => {
  const [carList, setCarList] = useState([]);

  const { modalDispatch } = useContext<any>(GlobalContext);

  const triggerModal = () => {
    modalDispatch(openDialog(DIALOGS.BOOK));
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
