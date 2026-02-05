import { screen } from '@testing-library/react';
import { renderWithOverlay } from '../test.utils';
import { Basic } from './Tray.stories';

test('renders trigger button', () => {
  renderWithOverlay(<Basic.Component />);

  expect(screen.getByRole('button', { name: 'Open Tray' })).toBeInTheDocument();
});

test('tray content is not visible when closed', () => {
  renderWithOverlay(<Basic.Component />);

  expect(screen.queryByText('Tray Title')).not.toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
