import { useState, useEffect, FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { FIELDS } from '@constants/fields';

dayjs.extend(localizedFormat);

interface I_PROPS {
  formState: any;
  onSubmit: (data: any) => void;
  onReset: () => void;
  handleModal: () => void;
}

const DatePickers: FC<I_PROPS> = ({ ...props }) => {
  const [searchParams] = useSearchParams();

  const { register, setValue, watch, trigger } = useFormContext();
  const errors = props.formState?.errors;

  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  useEffect(() => {
    setValue(FIELDS.BOOKING.START_DATE, startDate);
    setValue(FIELDS.BOOKING.END_DATE, endDate);
  }, [startDate, endDate, setValue]);

  useEffect(() => {
    if (Object.keys(Object.fromEntries(searchParams)).length === 0) return;

    const { start, end, status } = Object.fromEntries(searchParams);
    const startDate: Date = new Date(start);
    const endDate: Date = new Date(end);
    setStartDate(startDate);
    setEndDate(endDate);
  }, [searchParams, setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      trigger(FIELDS.BOOKING.END_DATE, {
        shouldFocus: true,
      });
      trigger(FIELDS.BOOKING.START_DATE, {
        shouldFocus: true,
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  return (
    <>
      <input
        type="hidden"
        id="startDate"
        {...register(FIELDS.BOOKING.START_DATE, {
          required: 'This is required',
        })}
      />
      <input
        type="hidden"
        id="endDate"
        {...register(FIELDS.BOOKING.END_DATE, { required: 'This is required' })}
      />
      <div className="grid grid-cols-1 items-center mb-3">
        <label className="block text-sm font-medium text-gray-700 border-red-500">
          Form
        </label>
        <div className="w-full col-span-8 ">
          <DatePicker
            dateFormat="dd MMM yyyy"
            placeholderText={dayjs(new Date())
              .startOf('M')
              .format('DD MMM YYYY')}
            selected={startDate}
            onChange={(date: any) => {
              setStartDate(date);
              setEndDate(null);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            withPortal
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none sm:text-sm rounded-md"
          />
        </div>
      </div>
      {errors?.[FIELDS.FILTER.START_DATE] && (
        <span className="text-xs text-red-500 block capitalize text-left mb-2">
          <ErrorMessage errors={errors} name={FIELDS.FILTER.START_DATE} />
        </span>
      )}
      <div className="grid grid-cols-1 items-center">
        <label className="block text-sm font-medium text-gray-700 border-red-500">
          To
        </label>
        <div className="w-full col-span-8 ">
          <DatePicker
            dateFormat="dd MMM yyyy"
            placeholderText={dayjs(new Date()).endOf('M').format('DD MMM YYYY')}
            selected={endDate}
            onChange={(date: any) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            withPortal
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none sm:text-sm rounded-md"
          />
        </div>
      </div>
      {errors?.[FIELDS.FILTER.END_DATE] && (
        <span className="text-xs text-red-500 block capitalize text-left mb-2">
          <ErrorMessage errors={errors} name={FIELDS.FILTER.END_DATE} />
        </span>
      )}
    </>
  );
};

export default DatePickers;
