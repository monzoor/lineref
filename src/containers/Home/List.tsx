import { FC, useEffect, useState } from 'react';
import { useAppState } from '@context/Provider';
import TableHeader from './TableHeader';

interface IItem {
  name: string;
  code: string;
  availability: boolean;
  needing_repair: boolean;
  durability: number;
  max_durability: number;
  mileage: number;
}

const Lists: FC = () => {
  const [itemList, setItemList] = useState([]);
  const [state] = useAppState();
  const { items } = state;

  useEffect(() => {
    if (items.data.length) {
      setItemList(items.data);
    } else {
      setItemList([]);
    }
  }, [items]);

  // console.log('=====', items);

  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader />
            <tbody>
              {itemList.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <p className="text-center py-3">No item found</p>
                  </td>
                </tr>
              ) : (
                itemList.map((item: IItem, index: number) => {
                  const {
                    name,
                    code,
                    availability,
                    needing_repair,
                    durability,
                    max_durability,
                    mileage,
                  } = item;
                  return (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {availability ? 'Available' : 'Not available'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {needing_repair ? 'Yes' : 'No'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {durability}/{max_durability}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {mileage ? mileage : 0}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Lists;
