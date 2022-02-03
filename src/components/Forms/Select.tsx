import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface ISelect {
  label: string;
  name: string;
  id: string;
  options: string[];
  defaultValue?: string;
  required?: boolean;
  validation?: {
    [key: string]: any;
  };
}

const Select: FC<ISelect> = ({
  label,
  name,
  id,
  defaultValue,
  options,
  required,
  validation = {},
}) => {
  const { register, formState } = useFormContext();
  const errors = formState?.errors;

  const validations = required
    ? {
        required: 'This is required',
        ...validation,
      }
    : { ...validation };
  return (
    <>
      <div className="mt-5">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 border-red-500"
        >
          {label}
        </label>
        <select
          id={id}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none sm:text-sm rounded-md"
          defaultValue={defaultValue}
          {...register(name, validations)}
        >
          <option disabled value="">
            Please select an item
          </option>
          {options.map((option: any, index: number) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {errors && (
          <span className="text-xs text-red-500 block capitalize text-left mb-2">
            <ErrorMessage errors={errors} name={name} />
          </span>
        )}
      </div>
    </>
  );
};

export default Select;
