import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { act } from 'react-dom/test-utils';
import { useForm } from 'react-hook-form';
import DatePickers from '../Datepicker';

import Form from '../Form';

const Test = () => {
  const methods = useForm();

  return (
    <Form methods={methods}>
      {(props: any) => (
        <>
          <DatePickers {...props} />
        </>
      )}
    </Form>
  );
};

describe('Test Date picker', () => {
  it('Date picker render correctly', async () => {
    const promise = Promise.resolve();

    const { getByTestId, getByPlaceholderText } = render(<Test />);

    const startDateValue = '2022-10-20';
    const endDateValue = '2022-10-21';

    const startDate = getByPlaceholderText(
      dayjs(new Date()).startOf('M').format('DD MMM YYYY'),
    ) as HTMLInputElement;

    startDate.setSelectionRange(0, startDate.value.length);

    userEvent.type(startDate, startDateValue);

    await act(() => promise);
    expect(startDate.value).toBe(startDateValue);

    const endDate = getByPlaceholderText(
      dayjs(new Date()).endOf('M').format('DD MMM YYYY'),
    ) as HTMLInputElement;
    endDate.setSelectionRange(0, endDate.value.length);

    userEvent.type(endDate, endDateValue);

    await act(() => promise);

    expect(endDate.value).toBe(endDateValue);

    const startDateHidden = getByTestId('startDate') as HTMLInputElement;
    const endDateHidden = getByTestId('endDate') as HTMLInputElement;

    expect(dayjs(startDateHidden.value).format('YYYY-MM-DD')).toBe(
      startDateValue,
    );
    expect(dayjs(endDateHidden.value).format('YYYY-MM-DD')).toBe(endDateValue);
  });
});
