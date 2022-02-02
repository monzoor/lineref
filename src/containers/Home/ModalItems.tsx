import { FC } from 'react';

import { openDialog } from '@actions/core/modalActions';
import { DIALOGS } from '@constants/dialogs';
import { useAppState } from '@context/Provider';
import { Button, BUTTON_VARIANT } from '@components';

const ModalItems: FC = () => {
  const [state, dispatch] = useAppState();

  const triggerModal = () => {
    dispatch(openDialog(DIALOGS.BOOK));
  };
  return (
    <div className="grid grid-cols-2 w-6/12 gap-4 items-end">
      <Button
        onClick={triggerModal}
        variant={BUTTON_VARIANT.PRIMARY}
        type="button"
        text="Book"
      />
      <Button
        onClick={triggerModal}
        variant={BUTTON_VARIANT.PRIMARY}
        type="button"
        text="Book"
      />
    </div>
  );
};

export default ModalItems;
