import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

interface ButtonTypes {
  [others: string]: any;
}

export const BUTTON_VARIANT = {
  PRIMARY: 'text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500',
  CANCEL: 'text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500',
  SUCCESS:
    'text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500',
};
export const Button: FC<ButtonTypes> = (props) => {
  const { text, type, className, small, variant, to, disabled } = props;
  const buttonStyles = classNames(
    'inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm',
    variant,

    {
      [className]: classNames,
      'disabled:opacity-75': disabled,
    },
  );
  if (to) {
    return (
      <Link to={to} className={buttonStyles}>
        {text}
      </Link>
    );
  }
  return (
    <>
      <button {...props} type={type || 'button'} className={buttonStyles}>
        {text}
      </button>
    </>
  );
};
