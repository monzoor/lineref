import { render, screen, act } from '@testing-library/react';
import App from './containers/Core';

test('Render home page', async () => {
  const promise = Promise.resolve();
  render(<App />);
  const element = screen.getByTestId('spinner');

  expect(element).toBeInTheDocument();
  await act(() => promise);
  const homeText = screen.getByText(/Analyzer/i);
  expect(homeText).toBeInTheDocument();
});
