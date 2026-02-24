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
      class="ui-button-base ui-surface shadow-elevation-border hover:[--ui-background-color:var(--color-hover)] hover:text-foreground disabled:border-0 disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled)] selected:[--ui-background-color:var(--color-input)] selected:shadow-none in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-y-0 in-[.group]:border-l-0 in-[.group]:first:rounded-l-surface in-[.group]:last:rounded-r-surface in-[.group]:last:border-r-0 text-sm h-button px-4 py-2 [&_svg]:size-4"
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
      class="ui-button-base ui-surface shadow-elevation-border hover:[--ui-background-color:var(--color-hover)] hover:text-foreground disabled:border-0 disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled)] selected:[--ui-background-color:var(--color-input)] selected:shadow-none in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-y-0 in-[.group]:border-l-0 in-[.group]:first:rounded-l-surface in-[.group]:last:rounded-r-surface in-[.group]:last:border-r-0 text-xs h-button-small px-3 [&_svg]:size-3.5"
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
      class="ui-button-base ui-surface shadow-elevation-border hover:[--ui-background-color:var(--color-hover)] hover:text-foreground disabled:border-0 disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled)] selected:[--ui-background-color:var(--color-input)] selected:shadow-none in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-y-0 in-[.group]:border-l-0 in-[.group]:first:rounded-l-surface in-[.group]:last:rounded-r-surface in-[.group]:last:border-r-0 size-button [&_svg]:size-4"
      data-rac=""
      data-react-aria-pressable="true"
      tabindex="0"
      type="button"
    >
      Toggle
    </button>
  `);
});
