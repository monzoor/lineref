import { useContext } from 'react';
import { DIALOGS as DIALOGS_NAMES } from '@constants/dialogs';
import { GlobalContext } from '@context/Provider';

import Book from '@components/Dialog/Book';

const DIALOG_COMPONENTS = {
  [DIALOGS_NAMES.BOOK]: Book,
};

const Dialogs = () => {
  // const { modalState, modalDispatch } = useContext(GlobalContext);
  const { modalState } = useContext(GlobalContext);
  const isAnyOpened = modalState.modalOpened;
  const dialog = modalState;

  // if (isAnyOpened) {
  //   document.body.classList.add('modal-open');
  // } else {
  //   document.body.classList.remove('modal-open');
  // }

  return (
    <>
      {Object.values(DIALOGS_NAMES).map((dialogName) => {
        const DialogComponent = DIALOG_COMPONENTS[dialogName];
        const data = dialog[dialogName].data;
        const isHided = dialog[dialogName].isHided;

        return dialog[dialogName].isOpen ? (
          <DialogComponent
            key={dialogName}
            isOpen={true}
            data={data}
            name={dialogName}
            isHided={isHided}
          />
        ) : null;
      })}

      {isAnyOpened ? <div className="modal-backdrop fade show"></div> : null}
    </>
  );
};
export default Dialogs;
