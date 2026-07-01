import { render, screen } from '@testing-library/react';
import { Basic } from './Badge.stories';

// Variant order rendered by the `Basic` showcase story. Deriving the index from
// this list (instead of a bare `[4]`) keeps the assertion pointed at the info
// variant even if the showcase is reordered.
const VARIANT_ORDER = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'error',
  'master',
  'admin',
] as const;

test('renders the info variant correctly', () => {
  render(<Basic.Component />);

  // Basic renders one "Status" badge per variant; pick the info variant's markup.
  const badge = screen.getAllByText('Status')[VARIANT_ORDER.indexOf('info')];

  expect(badge).toMatchInlineSnapshot(`
    <div
      class="inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal focus-visible:ui-state-focus outline-none has-[svg]:gap-1 bg-info text-info-foreground"
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
