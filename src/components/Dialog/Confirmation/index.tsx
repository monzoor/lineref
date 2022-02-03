import { FC, memo } from 'react';

import { closeDialog } from '@actions/core/modalActions';
import { useAppState } from '@context/Provider';

import ModalLayout from '../ModalLayout';
import { Button, BUTTON_VARIANT } from '@components';
import { setLSValue } from '@utils/storage';
import { LS_KEYS } from '@constants';
import { getSuccessFetchData } from '@actions/data';

interface IProps {
  name: string;
  isOpen: boolean;
  data?: any;
  isHided?: boolean;
}
const Confirmation: FC<IProps> = (props) => {
  const {
    isOpen,
    name,
    data: { calculatedPrice, totalDays, data },
  } = props;
  console.log('=props', data);

  const [state, dispatch] = useAppState();
  const {
    products: { items },
  } = state;

  const onCloseModal = () => {
    dispatch(closeDialog(name));
  };

  // console.log('=====', state);
  const onSubmit = () => {
    const findIndex = items.data.findIndex((it: any) => it.code === data.code);
    items.data[findIndex].availability = false;
    items.data[findIndex].bookedFor = totalDays;

    setLSValue(LS_KEYS.USER_DATA, items.data);
    dispatch(getSuccessFetchData(items.data));
    onCloseModal();
  };

  return (
    <ModalLayout open={isOpen} dialogName={name}>
      <div className="min-h-screen flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="relative w-full md:w-1/2  bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
            <div
              onClick={onCloseModal}
              className=" w-12 h-12 p-3 text-2xl text-right absolute z-20 right-0 cursor-pointer"
            >
              X
            </div>
            <div className="px-4 py-5 sm:p-6 text-center">
              <h3 className="text-xl mb-4 leading-6 font-medium">
                {data.isBook ? 'Book a product' : 'Return a product'}
              </h3>

              <p className="text-lg">
                Your estimated price is{' '}
                <span className="font-bold text-indigo-500">
                  ${calculatedPrice}{' '}
                </span>
                for {totalDays} days.
                <br />
                Do you want to continue?
              </p>
              <div className="mt-5 flex gap-4 justify-center">
                <Button
                  onClick={onCloseModal}
                  variant={BUTTON_VARIANT.CANCEL}
                  text="No"
                />
                <Button
                  type="button"
                  variant={BUTTON_VARIANT.SUCCESS}
                  text="Yes"
                  onClick={onSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default memo(Confirmation);
