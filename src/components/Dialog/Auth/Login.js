import { useForm } from 'react-hook-form';

import { useContext } from 'react';

import { closeDialog } from '@actions/core/modalActions';
import { GlobalContext } from '@context/Provider';
// import { Button, Fields, Form, BUTTON_COLOR } from '@components';

import ModalLayout from '../ModalLayout';
// import { XIcon } from '@heroicons/react/outline';

const AuthDialog = (props) => {
  const { isOpen, name } = props;
  const methods = useForm({ mode: 'onChange' });
  const {
    formState: { isDirty, isValid },
  } = methods;

  const { modalDispatch } = useContext(GlobalContext);

  const onCloseModal = () => {
    modalDispatch(closeDialog(name));
  };

  console.log('=s==s=s=***', props);
  const onSubmit = (data) => {
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
      <div className="selection:bg-orange-500 selection:text-white">
        <div className="min-h-screen flex justify-center items-center">
          <div className="p-8 flex-1">
            <div className="relative w-80 bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
              <div className="relative h-48 bg-orange-500 rounded-bl-4xl">
                <svg
                  className="absolute bottom-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#ffffff"
                    fillOpacity="1"
                    d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  ></path>
                </svg>
              </div>
              <div className="px-10 pt-4 pb-8 bg-white rounded-tr-4xl relative z-50">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Welcome back!
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default AuthDialog;
