import { render, screen } from '@testing-library/react';
import { Basic } from './Tray.stories';

test('renders trigger button', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('button', { name: 'Open Tray' })).toBeInTheDocument();
});
