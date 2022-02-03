import { useForm } from 'react-hook-form';

import { FC } from 'react';

import { closeDialog } from '@actions/core/modalActions';
import { useAppState } from '@context/Provider';

import ModalLayout from '../ModalLayout';
import { Select, Form, DatePickers, Button, BUTTON_VARIANT } from '@components';
import { FIELDS } from '@constants/fields';
import { priceCalculation, totalDaysCalculator } from '@utils';

interface IProps {
  name: string;
  isOpen: boolean;
  data?: any;
  isHided?: boolean;
}
const AuthDialog: FC<IProps> = (props) => {
  const { isOpen, name } = props;
  const methods = useForm({ mode: 'onChange' });
  const {
    formState: { isDirty, isValid },
  } = methods;

  const [state, dispatch] = useAppState();
  const {
    products: { availableItems },
  } = state;

  const onCloseModal = () => {
    dispatch(closeDialog(name));
  };

  const onSubmit = (data: any) => {
    const dataItem = state.products.items.data.find(
      (it: any) => it.code === data.book,
    );
    const totalDays = totalDaysCalculator(data.startDate, data.endDate);

    const newData = {
      calculatedPrice: priceCalculation({ ...dataItem, ...data }),
      totalDays,
      data: dataItem,
    };
    console.log('----', newData);
  };

  // console.log('=====', state);

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
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Book an item
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Please select all the fields and submit on the button to get
                  the price.
                </p>
              </div>
              <Form methods={methods} onSubmit={onSubmit}>
                {(props: any) => (
                  <>
                    <div className="mt-5 mb-3">
                      <Select
                        {...props}
                        label="Select an item to book"
                        name={FIELDS.BOOKING.BOOKING}
                        id={FIELDS.BOOKING.BOOKING}
                        defaultValue=""
                        options={availableItems}
                        required
                      />
                    </div>
                    <DatePickers {...props} />
                    <div className="mt-5 flex gap-4 justify-end">
                      <Button
                        onClick={onCloseModal}
                        variant={BUTTON_VARIANT.CANCEL}
                        text="No"
                      />
                      <Button
                        type="submit"
                        variant={BUTTON_VARIANT.SUCCESS}
                        text="Yes"
                        disabled={!isDirty || !isValid}
                      />
                    </div>
                  </>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default AuthDialog;
