import { render, screen } from '@testing-library/react';
import { Basic } from './Badge.stories';

test('renders correctly', () => {
  render(<Basic.Component data-testid="badge" />);

  const badge = screen.getByTestId('badge');

  expect(badge).toMatchInlineSnapshot(`
    <div
      class="inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal transition-colors focus-visible:ui-state-focus outline-none has-[svg]:gap-1 bg-info-muted text-info-muted-foreground"
      data-testid="badge"
    >
      Status
    </div>
  `);
});

test('shows the lock svg', () => {
  render(<Basic.Component data-testid="badge" variant="master" />);

  const svgs = screen.getAllByTestId('lock-icon');

  expect(svgs.length).toBe(1);
});
