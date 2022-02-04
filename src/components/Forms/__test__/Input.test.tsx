import { fireEvent, render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import Input from '../';

import Form from '../Form';

const Test = () => {
  const methods = useForm();

  return (
    <Form methods={methods}>
      {(props: any) => (
        <>
          <Input
            {...props}
            component="input"
            type="text"
            placeholder="Search by name"
            id="testInput"
            name="testInput"
            className="w-full"
            label="testInput"
          />
        </>
      )}
    </Form>
  );
};

describe('Test Input', () => {
  it('Input render correctly', async () => {
    const { getByText, getByLabelText } = render(<Test />);

    const input = getByLabelText('testInput') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '$23' } });

    expect(input.value).toBe('$23');

    expect(getByText('testInput')).toBeInTheDocument();
  });
});
