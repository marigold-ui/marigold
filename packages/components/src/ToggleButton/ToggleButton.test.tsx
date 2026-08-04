import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Basic } from './ToggleButton.stories';

test('renders correctly', () => {
  render(<Basic.Component />);

  const label = screen.getByText('Toggle');

  expect(label).toBeInTheDocument();
  expect(label).toMatchInlineSnapshot(`
    <button
      aria-pressed="false"
      class="ui-button-base gap-2 ui-control hover:[--ui-background-color:var(--color-hover)] hover:[--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_+_0.12))] hover:text-foreground selected:[--ui-background-color:var(--color-selected-bold)] selected:text-selected-bold-foreground in-[.group]:rounded-none in-[.group]:first:rounded-l-surface in-[.group]:last:rounded-r-surface in-[.group]:ring-0 in-[.group]:shadow-none in-[.group]:border-r in-[.group]:border-r-border in-[.group]:last:border-r-0 in-[.group]:hover:[--ui-border-color:initial] text-sm h-control px-4 py-2 [&_svg]:size-4 in-[.group]:focus-visible:z-10"
      data-rac=""
      data-react-aria-pressable="true"
      tabindex="0"
      type="button"
    >
      Toggle
    </button>
  `);
});

test('respects disabled state', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<Basic.Component disabled onChange={onChange} />);
  const button = screen.getByRole('button');

  await user.click(button);

  expect(onChange).not.toHaveBeenCalled();
  expect(button).toBeDisabled();
});

test('respects initial selected state', () => {
  render(<Basic.Component selected />);

  const button = screen.getByRole('button');

  expect(button).toHaveAttribute('data-selected', 'true');
});

test('renders children content', () => {
  render(<Basic.Component>Custom Label</Basic.Component>);

  expect(screen.getByText('Custom Label')).toBeInTheDocument();
});

test('supports different sizes', () => {
  const { rerender } = render(<Basic.Component size="small" />);
  let button = screen.getByRole('button');

  expect(button).toMatchInlineSnapshot(`
    <button
      aria-pressed="false"
      class="ui-button-base gap-2 ui-control hover:[--ui-background-color:var(--color-hover)] hover:[--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_+_0.12))] hover:text-foreground selected:[--ui-background-color:var(--color-selected-bold)] selected:text-selected-bold-foreground in-[.group]:rounded-none in-[.group]:first:rounded-l-surface in-[.group]:last:rounded-r-surface in-[.group]:ring-0 in-[.group]:shadow-none in-[.group]:border-r in-[.group]:border-r-border in-[.group]:last:border-r-0 in-[.group]:hover:[--ui-border-color:initial] text-xs h-control-small px-3 [&_svg]:size-3.5 in-[.group]:focus-visible:z-10"
      data-rac=""
      data-react-aria-pressable="true"
      tabindex="0"
      type="button"
    >
      Toggle
    </button>
  `);

  rerender(<Basic.Component size="icon" />);
  expect(screen.getByRole('button')).toMatchInlineSnapshot(`
    <button
      aria-pressed="false"
      class="ui-button-base gap-2 ui-control hover:[--ui-background-color:var(--color-hover)] hover:[--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_+_0.12))] hover:text-foreground selected:[--ui-background-color:var(--color-selected-bold)] selected:text-selected-bold-foreground in-[.group]:rounded-none in-[.group]:first:rounded-l-surface in-[.group]:last:rounded-r-surface in-[.group]:ring-0 in-[.group]:shadow-none in-[.group]:border-r in-[.group]:border-r-border in-[.group]:last:border-r-0 in-[.group]:hover:[--ui-border-color:initial] size-control [&_svg]:size-4 in-[.group]:focus-visible:z-10"
      data-rac=""
      data-react-aria-pressable="true"
      tabindex="0"
      type="button"
    >
      Toggle
    </button>
  `);
});
