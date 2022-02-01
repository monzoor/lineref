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
    setValue(FIELDS.FILTER.START_DATE, startDate);
    setValue(FIELDS.FILTER.END_DATE, endDate);
  }, [startDate, endDate, setValue]);

  useEffect(() => {
    if (Object.keys(Object.fromEntries(searchParams)).length === 0) return;

    const { start, end, status } = Object.fromEntries(searchParams);
    const startDate: Date = new Date(start);
    const endDate: Date = new Date(end);
    setStartDate(startDate);
    setEndDate(endDate);

    setValue(FIELDS.FILTER.STATUS, status);
  }, [searchParams, setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      trigger(FIELDS.FILTER.END_DATE, {
        shouldFocus: true,
      });
      trigger(FIELDS.FILTER.START_DATE, {
        shouldFocus: true,
      });
      trigger(FIELDS.FILTER.STATUS, { shouldFocus: true });
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  return (
    <>
      <input
        type="hidden"
        id="startDate"
        {...register(FIELDS.FILTER.START_DATE, {
          required: 'This is required',
        })}
      />
      <input
        type="hidden"
        id="endDate"
        {...register(FIELDS.FILTER.END_DATE, { required: 'This is required' })}
      />
      <div className="grid grid-cols-10 items-center">
        <label className="text-primary mr-2 col-span-2">Form</label>
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
            maxDate={new Date()}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            withPortal
            className="px-5 py-2 w-full border border-secondary appearance-none shadow-sm "
          />
        </div>
      </div>
      {errors?.[FIELDS.FILTER.START_DATE] && (
        <span className="text-xs text-red-500 block capitalize text-left mb-2">
          <ErrorMessage errors={errors} name={FIELDS.FILTER.START_DATE} />
        </span>
      )}
      <div className="grid grid-cols-10 items-center">
        <label className="text-primary mr-2 col-span-2">To</label>
        <div className="w-full col-span-8 ">
          <DatePicker
            dateFormat="dd MMM yyyy"
            placeholderText={dayjs(new Date()).endOf('M').format('DD MMM YYYY')}
            selected={endDate}
            onChange={(date: any) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            withPortal
            className="px-5 py-2 w-full border border-secondary appearance-none shadow-sm "
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
