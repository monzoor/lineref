import { FC, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { closeDialog, openDialog } from '@actions/core/modalActions';
import { useAppState } from '@context/Provider';

import ModalLayout from '../ModalLayout';
import { Select, Form, Button, BUTTON_VARIANT, Input } from '@components';
import { FIELDS } from '@constants/fields';
import { priceCalculation, totalDaysCalculator } from '@utils';
import { DIALOGS } from '@constants/dialogs';
import { CALCULATION_DEFAULT } from '@constants';

interface IProps {
  name: string;
  isOpen: boolean;
  data?: any;
  isHided?: boolean;
}
const ReturnDialog: FC<IProps> = (props) => {
  const { isOpen, name } = props;
  const methods = useForm({ mode: 'onChange' });
  const dataItem = useRef<IProduct>({} as any);
  const [state, dispatch] = useAppState();

  const {
    watch,
    setValue,
    formState: { isDirty, isValid },
  } = methods;

  const {
    products: { unAvailableItems, items },
  } = state;

  const onCloseModal = () => {
    dispatch(closeDialog(name));
  };

  const onSubmit = (data: any) => {
    dataItem.current = state.products.items.data.find(
      (it: any) => it.code === data.return,
    );
    // let { availability } = dataItem.current;
    dataItem.current.availability = true;

    // console.log('===', priceCalculation({ ...dataItem.current, ...data }));

    const newData = {
      calculatedPrice: priceCalculation({ ...dataItem.current, ...data }),
      totalDays: dataItem.current.bookedFor,
      data: dataItem.current,
    };

    dispatch(closeDialog(name));
    dispatch(openDialog(DIALOGS.CONFIRMATION, { ...newData, isBook: false }));
  };

  //   useEffect(() => {
  //     console.log('====', items);
  //   }, [items]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === FIELDS.BOOKING.RETURN) {
        const item = state.products.items.data.find(
          (it: any) => it.code === value[FIELDS.BOOKING.RETURN],
        );

        setValue(
          FIELDS.BOOKING.USED_MILEAGE,
          item?.bookedFor * CALCULATION_DEFAULT.MILAGE_PER_DAY,
        );
      }
    });
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
                  Please select all the fields and submit on the button to
                  return the product.
                </p>
              </div>
              <Form methods={methods} onSubmit={onSubmit}>
                {(props: any) => (
                  <>
                    <div className="mt-5 mb-3">
                      <Select
                        {...props}
                        label="Select an item to book"
                        name={FIELDS.BOOKING.RETURN}
                        id={FIELDS.BOOKING.RETURN}
                        defaultValue=""
                        options={unAvailableItems}
                        required
                      />
                    </div>

                    <div>
                      <Input
                        {...props}
                        component="input"
                        type="number"
                        placeholder="Used Mileage"
                        label="Used Mileage"
                        id={FIELDS.BOOKING.USED_MILEAGE}
                        name={FIELDS.BOOKING.USED_MILEAGE}
                        disabled={true}
                      />
                    </div>

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

export default ReturnDialog;
