import { fireEvent, render } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import Form from '../Form';
import Select from '../Select';

const mockData = [
  {
    value: '1',
    name: 'Option 1',
  },
  {
    value: '2',
    name: 'Option 2',
  },
];

const Test = () => {
  const methods = useForm();

  return (
    <Form methods={methods}>
      {(props: any) => (
        <>
          <Select
            {...props}
            label="testSelect"
            name="testSelect"
            id="testSelect"
            defaultValue=""
            options={mockData}
            required
          />
        </>
      )}
    </Form>
  );
};

describe('Test Select', () => {
  it('Select render correctly', async () => {
    const { getByText, getByLabelText } = render(<Test />);

    const input = getByLabelText('testSelect') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '2' } });

    expect(input.value).toBe('2');

    expect(getByText('testSelect')).toBeInTheDocument();
  });
});
