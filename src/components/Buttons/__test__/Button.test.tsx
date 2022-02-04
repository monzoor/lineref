import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { Button, BUTTON_VARIANT } from '../';

describe('Test button', () => {
  it('Button render correctly', () => {
    const { container } = render(
      <Button
        type="button"
        text="Button"
        className="default"
        variant={BUTTON_VARIANT.PRIMARY}
      />,
    );
    const buttonText = screen.getByText(/Button/i);
    expect(buttonText).toBeInTheDocument();

    expect(container.getElementsByClassName('default').length).toBe(1);
  });

  it('Link render correctly', () => {
    const { container, getByText } = render(
      <Button
        text="Link"
        className="default"
        variant={BUTTON_VARIANT.PRIMARY}
        to="/test"
      />,
      { wrapper: MemoryRouter },
    );

    const url1 = screen.getByText('Link');
    expect(url1).toBeInTheDocument();

    userEvent.click(url1);
    expect(url1).toHaveAttribute('href', '/test');
  });
});
