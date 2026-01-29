import { render, screen } from '@testing-library/react';
import { Basic } from './Tray.stories';

test('renders trigger button', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('button', { name: 'Open Tray' })).toBeInTheDocument();
});

test('tray content is not visible when closed', () => {
  render(<Basic.Component />);

  expect(screen.queryByText('Tray Title')).not.toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
