import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface I_CHECKBOX_PROPS {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
}

const CheckBox: FC<I_CHECKBOX_PROPS> = ({ id, name, checked, label }) => {
  const { register } = useFormContext();

  return (
    <div className="flex items-center">
      <input
        id={id}
        value={id}
        type="radio"
        defaultChecked={checked}
        {...register(name)}
        className="focus:ring-primary accent-primary h-4 w-4 text-primary border-gray-300"
      />
      <label
        htmlFor={id}
        className="ml-3 block text-sm font-medium text-gray-dark"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
