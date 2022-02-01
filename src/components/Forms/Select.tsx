import { FC } from 'react';

const Select: FC = () => {
  return (
    <>
      <div className="mt-5">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 border-red-500"
        >
          Select you item
        </label>
        <select
          id="location"
          name="location"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none sm:text-sm rounded-md"
          defaultValue="Canada"
        >
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </select>
      </div>
    </>
  );
};

export default Select;
