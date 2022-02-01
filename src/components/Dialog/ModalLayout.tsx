import { FC } from 'react';
import { Dialog } from '@headlessui/react';
import { closeDialog } from '@actions/core/modalActions';
import { useAppState } from '@context/Provider';

interface IProps {
  open: boolean;
  dialogName: string;
  showCloseButton?: boolean;
}

const ModalLayout: FC<IProps> = ({
  children,
  open,
  dialogName,
  showCloseButton = false,
}) => {
  const [, dispatch] = useAppState();

  const onCloseModal = () => {
    dispatch(closeDialog(dialogName));
  };

  return (
    <Dialog
      open={open}
      onClose={onCloseModal}
      className="fixed z-50 top-0 inset-0"
    >
      <Dialog.Overlay
        onClick={onCloseModal}
        className="fixed inset-0 bg-black opacity-70"
      />

      {showCloseButton && (
        <div
          onClick={onCloseModal}
          className="w-10 h-10 text-white absolute right-5 top-5 z-20"
        >
          X{' '}
        </div>
      )}
      <div className="min-h-screen flex justify-center items-center">
        <div className="min-w-full relative z-50 px-10">{children}</div>
      </div>
    </Dialog>
  );
};

export default ModalLayout;
