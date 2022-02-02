import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface ISelect {
  label: string;
  name: string;
  id: string;
  options: string[];
  defaultValue?: string;
}

const Select: FC<ISelect> = ({ label, name, id, defaultValue, options }) => {
  const { register } = useFormContext();
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
          {...register(name)}
        >
          <option>Please select an item</option>
          {options.map((option: any, index: number) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
