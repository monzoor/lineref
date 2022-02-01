import { FC, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import { ErrorMessage } from '@hookform/error-message';

interface I_PROPS {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  component?: any;
  type?: string;
  placeholder?: string;
  icon?: string;
  required?: boolean;
  value?: string;
  validation?: {
    [key: string]: any;
  };
}

const Input: FC<I_PROPS> = forwardRef(
  (
    {
      component,
      id = '',
      type,
      name,
      placeholder,
      label,
      icon,
      required,
      value,
      validation = {},
    },
    ref,
  ) => {
    const Wrapper = component;
    const { register } = useFormContext();
    const { formState } = useFormContext();
    const errors = formState?.errors;

    const inputClassNames = classNames(
      'appearance-none border border-primary shadow-sm w-full col-span-8 px-5 py-2',
      { 'h-36': component === 'textarea' },
      { 'h-10': component !== 'textarea' },
      { 'pl-10': icon },
    );
    const validations = required
      ? {
          required: 'This is required',
          ...validation,
        }
      : { ...validation };

    return (
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        <div
          className={`grid relative ${
            label ? 'grid-cols-10' : 'grid-cols-1'
          } items-center`}
        >
          {label && (
            <label htmlFor={id} className="text-primary mr-2 col-span-2">
              {label}
              {required && <sup className="text-red-500">*</sup>}
            </label>
          )}
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img className="h-5 w-5 " src={icon} alt="search" />
            </div>
          )}

          <Wrapper
            id={id}
            type={type}
            className={inputClassNames}
            placeholder={placeholder}
            defaultValue={value}
            {...register(name, validations)}
          />
        </div>

        {errors && (
          <span className="text-xs text-red-500 block capitalize text-left mb-2">
            <ErrorMessage errors={errors} name={name} />
          </span>
        )}
      </div>
    );
  },
);

export default Input;
