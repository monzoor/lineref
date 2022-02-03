import { FC, memo } from 'react';

import { openDialog } from '@actions/core/modalActions';
import { DIALOGS } from '@constants/dialogs';
import { Button, BUTTON_VARIANT } from '@components';

interface IProps {
  dispatch: any;
}
const ModalItems: FC<IProps> = ({ dispatch }) => {
  const triggerModalBooking = () => {
    dispatch(openDialog(DIALOGS.BOOK));
  };
  const triggerModalReturn = () => {
    dispatch(openDialog(DIALOGS.RETURN));
  };

  return (
    <div className="flex gap-4 justify-end my-5">
      <Button
        onClick={triggerModalBooking}
        variant={BUTTON_VARIANT.PRIMARY}
        type="button"
        text="Book"
      />
      <Button
        onClick={triggerModalReturn}
        variant={BUTTON_VARIANT.PRIMARY}
        type="button"
        text="Return"
      />
    </div>
  );
};

export default memo(ModalItems);
