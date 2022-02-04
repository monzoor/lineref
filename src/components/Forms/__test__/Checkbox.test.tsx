import { fireEvent, render } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import CheckBox from '../';
import Form from '../Form';

const Test = () => {
  const methods = useForm();

  return (
    <Form methods={methods}>
      {(props: any) => (
        <>
          <CheckBox
            {...props}
            id="test"
            type="radio"
            name="test"
            label="Option 1"
          />
          <CheckBox
            {...props}
            id="test2"
            type="radio"
            name="test"
            label="Option 2"
          />
        </>
      )}
    </Form>
  );
};

describe('Test Checkbox', () => {
  it('Checkbox render correctly', async () => {
    const { getByText, getByLabelText } = render(<Test />);

    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();

    const secondRadio = getByLabelText('Option 2');
    fireEvent.click(secondRadio);
    expect(secondRadio).toBeChecked();

    const firstRadio = getByLabelText('Option 1');
    fireEvent.click(firstRadio);
    expect(firstRadio).toBeChecked();
    expect(secondRadio).not.toBeChecked();
  });
});
