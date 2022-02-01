import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ButtonTypes {
  [others: string]: any;
}

export const BUTTON_VARIANT = {
  PRIMARY: 'bg-primary text-white',
};
export const Button: FC<ButtonTypes> = (props) => {
  const { text, type, className, small, variant, to, disabled } = props;
  const buttonSize = small ? 'px-5 py-2 text-sm' : 'py-3 px-5 text-base';
  const buttonStyles = classNames(
    'border border-transparent focus:outline-none rounded',
    buttonSize,
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
