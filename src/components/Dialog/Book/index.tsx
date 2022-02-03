import { FC, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { closeDialog, openDialog } from '@actions/core/modalActions';
import { useAppState } from '@context/Provider';

import ModalLayout from '../ModalLayout';
import { Select, Form, DatePickers, Button, BUTTON_VARIANT } from '@components';
import { FIELDS } from '@constants/fields';
import { priceCalculation, totalDaysCalculator } from '@utils';
import { DIALOGS } from '@constants/dialogs';

interface IProps {
  name: string;
  isOpen: boolean;
  data?: any;
  isHided?: boolean;
}
const BookDialog: FC<IProps> = (props) => {
  const { isOpen, name } = props;
  const methods = useForm({ mode: 'onChange' });
  const [rentalPeriodError, setRentalPeriodError] = useState(false);
  const dataItem = useRef<IProduct>({} as any);

  const {
    watch,
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
    dataItem.current = state.products.items.data.find(
      (it: any) => it.code === data.book,
    );
    const miniMumRentPeriod = dataItem.current?.minimum_rent_period;

    const totalDays = totalDaysCalculator(data.startDate, data.endDate);
    if (totalDays < miniMumRentPeriod) {
      setRentalPeriodError(true);
      return;
    }
    if (rentalPeriodError) {
      setRentalPeriodError(false);
    }

    const newData = {
      calculatedPrice: priceCalculation({ ...dataItem.current, ...data }),
      totalDays,
      data: dataItem.current,
    };
    dispatch(closeDialog(name));
    dispatch(openDialog(DIALOGS.CONFIRMATION, { ...newData, isBook: true }));
  };

  useEffect(() => {
    const subscription = watch(() => setRentalPeriodError(false));
    return () => subscription.unsubscribe();
  }, [watch]);

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
                Book a product
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
                    {rentalPeriodError && (
                      <span className="text-xs mt-2 text-red-500 block capitalize text-left mb-2">
                        You must book at least{' '}
                        {dataItem.current?.minimum_rent_period} days
                      </span>
                    )}
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

export default BookDialog;
