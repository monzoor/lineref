import { useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { closeDialog } from '@actions/core/modalActions';
import { GlobalContext } from '@context/Provider';

const ModalLayout = ({
  children,
  open,
  dialogName,
  showCloseButton = false,
}) => {
  const { modalDispatch } = useContext(GlobalContext);

  const onCloseModal = () => {
    modalDispatch(closeDialog(dialogName));
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
