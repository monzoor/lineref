import { FC, memo } from 'react';

import { openDialog } from '@actions/core/modalActions';
import { DIALOGS } from '@constants/dialogs';
import { Button, BUTTON_VARIANT } from '@components';

interface IProps {
  dispatch: any;
}
const ModalItems: FC<IProps> = ({ dispatch }) => {
  const triggerModal = () => {
    dispatch(openDialog(DIALOGS.BOOK));
  };

  console.log('==ren button');

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

export default memo(ModalItems);
