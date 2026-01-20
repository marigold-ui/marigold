import { render, screen } from '@testing-library/react';
import { Basic } from './Badge.stories';

test('renders correctly', () => {
  render(<Basic.Component data-testid="badge" />);

  const badge = screen.getByTestId('badge');

  expect(badge).toMatchInlineSnapshot(`
    <div
      class="inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal transition-colors focus-visible:util-focus-ring outline-none has-[svg]:gap-1 bg-info-muted text-info-muted-foreground"
      data-testid="badge"
    >
      Status
    </div>
  `);
});

test.each`
  variant      | props
  ${null}      | ${{ css: 'inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal transition-colors focus-visible:util-focus-ring outline-none has-[svg]:gap-1 bg-muted text-foreground border border-border' }}
  ${'info'}    | ${{ css: 'inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal transition-colors focus-visible:util-focus-ring outline-none has-[svg]:gap-1 bg-info-muted text-info-muted-foreground' }}
  ${'primary'} | ${{ css: 'inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal transition-colors focus-visible:util-focus-ring outline-none has-[svg]:gap-1 bg-brand text-brand-foreground' }}
  ${'success'} | ${{ css: 'inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal transition-colors focus-visible:util-focus-ring outline-none has-[svg]:gap-1 bg-success-muted text-success-muted-foreground' }}
  ${'warning'} | ${{ css: 'inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal transition-colors focus-visible:util-focus-ring outline-none has-[svg]:gap-1 bg-warning-muted text-warning-muted-foreground' }}
  ${'error'}   | ${{ css: 'inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal transition-colors focus-visible:util-focus-ring outline-none has-[svg]:gap-1 bg-destructive-muted text-destructive-muted-foreground' }}
  ${'master'}  | ${{ css: 'inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal transition-colors focus-visible:util-focus-ring outline-none has-[svg]:gap-1 text-access-master-foreground border border-access-master-foreground bg-background' }}
  ${'admin'}   | ${{ css: 'inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal transition-colors focus-visible:util-focus-ring outline-none has-[svg]:gap-1 text-access-admin-foreground border border-access-admin-foreground bg-background' }}
`(
  'applies the correct CSS class for variant $variant',
  ({ variant, props }) => {
    render(<Basic.Component data-testid="badge" variant={variant} />);

    const badge = screen.getByTestId('badge');

    expect(badge).toHaveClass(props.css);
  }
);

test('shows the lock svg', () => {
  render(<Basic.Component data-testid="badge" variant="master" />);

  const svgs = screen.getAllByTestId('lock-icon');

  expect(svgs.length).toBe(1);
});
