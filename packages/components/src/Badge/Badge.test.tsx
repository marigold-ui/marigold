import { render, screen } from '@testing-library/react';
import { Basic } from './Badge.stories';

test('renders correctly', () => {
  render(<Basic.Component />);

  // Basic now renders the full variant showcase; assert the info variant's markup
  const badge = screen.getAllByText('Status')[4];

  expect(badge).toMatchInlineSnapshot(`
    <div
      class="inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal focus-visible:ui-state-focus outline-none has-[svg]:gap-1 bg-info-muted text-info-muted-foreground"
    >
      Status
    </div>
  `);
});

test('shows the lock svg', () => {
  render(<Basic.Component />);

  // the master and admin variants both render a lock icon
  const svgs = screen.getAllByTestId('lock-icon');

  expect(svgs.length).toBe(2);
});
