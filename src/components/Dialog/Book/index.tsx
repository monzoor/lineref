import { useForm } from 'react-hook-form';

import { FC } from 'react';

import { closeDialog } from '@actions/core/modalActions';
import { useAppState } from '@context/Provider';
// import { Button, Fields, Form, BUTTON_COLOR } from '@components';

import ModalLayout from '../ModalLayout';
import { Select, Form } from '@components';
import { FIELDS } from '@constants/fields';

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

  const onCloseModal = () => {
    dispatch(closeDialog(name));
  };

  const onSubmit = (data: any) => {
    console.log('----', data);
  };

  return (
    <ModalLayout open={isOpen} dialogName={name}>
      <div
        onClick={onCloseModal}
        className="text-white w-12 h-12 p-3 text-right absolute z-20 right-0 cursor-pointer"
      >
        X
      </div>

      <div className="min-h-screen flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="relative w-1/2 bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Book an item
              </h3>
              {/* <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Once you delete your account, you will lose all data
                  associated with it.
                </p>
              </div> */}
              <Form methods={methods} onSubmit={onSubmit}>
                {(props: any) => (
                  <>
                    <div className="mt-5">
                      <Select
                        {...props}
                        label="Select an item to book"
                        name={FIELDS.BOOKING.ITEM}
                        id={FIELDS.BOOKING.ITEM}
                        defaultValue="0"
                        options={[
                          {
                            label: 'Item 1',
                            value: 'item1',
                          },
                          {
                            label: 'Item 2',
                            value: 'item2',
                          },
                        ]}
                      />
                    </div>
                    <div className="mt-5">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                      >
                        Delete account
                      </button>
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
