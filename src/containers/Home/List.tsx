import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { LS_KEYS } from '@constants';
import { getLSValue } from '@utils/storage';
import TableHeader from './TableHeader';
import { Form, Input } from '@components';
import { FIELDS } from '@constants/fields';
import { useAppState } from '@context/Provider';

const Lists: FC = () => {
  const [itemList, setListItems] = useState(getLSValue(LS_KEYS.USER_DATA));
  const [state] = useAppState();
  // const itemList = getLSValue(LS_KEYS.USER_DATA);

  const methods = useForm({ mode: 'onChange' });
  const { watch, setValue } = methods;

  useEffect(() => {
    setListItems(getLSValue(LS_KEYS.USER_DATA));
    setValue(FIELDS.SEARCH, '');
  }, [state]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.search === '') {
        setListItems(getLSValue(LS_KEYS.USER_DATA));
      } else {
        const searchItems = itemList.filter((item: any) => {
          return item.name.toLowerCase().includes(value.search.toLowerCase());
        });
        setListItems(searchItems);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, itemList]);

  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="flex justify-end w-full mb-5">
          <Form methods={methods}>
            {(props: any) => (
              <Input
                {...props}
                component="input"
                type="text"
                placeholder="Search by name"
                id={FIELDS.SEARCH}
                name={FIELDS.SEARCH}
                className="w-full"
              />
            )}
          </Form>
        </div>
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
                itemList.map((item: IProduct, index: number) => {
                  const {
                    name,
                    code,
                    availability,
                    needing_repair,
                    durability,
                    max_durability,
                    mileage,
                    hasDiscount,
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
                        {availability ? (
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            Not Available
                          </span>
                        )}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {hasDiscount ? '5%' : 0}
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
