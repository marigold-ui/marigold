import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleButtonProps } from './ToggleButton';
import { Basic } from './ToggleButton.stories';

// Setup
// ---------------
const BasicComponent = (props: ToggleButtonProps) => (
  <div id="storybook-root">
    <Basic.Component {...props} />
  </div>
);

// Tests
// ---------------
test('renders correctly', () => {
  render(<BasicComponent />);

  const label = screen.getByText('Toggle');

  expect(label).toBeInTheDocument();
  expect(label).toMatchInlineSnapshot(`
    <button
      aria-pressed="false"
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[color,box-shadow,transform] [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:util-focus-ring outline-none disabled:util-disabled cursor-pointer border border-input bg-background shadow-xs hover:bg-hover hover:text-foreground selected:bg-input/50 selected:shadow-none in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-l-0 in-[.group]:first:rounded-l-md in-[.group]:first:border-l in-[.group]:last:rounded-r-md text-sm h-button px-4 py-2 [&_svg]:size-4"
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
  render(<BasicComponent disabled onChange={onChange} />);
  const button = screen.getByRole('button');

  await user.click(button);

  expect(onChange).not.toHaveBeenCalled();
  expect(button).toBeDisabled();
});

test('respects initial selected state', () => {
  render(<BasicComponent selected />);

  const button = screen.getByRole('button');

  expect(button).toHaveAttribute('data-selected', 'true');
});

test('renders children content', () => {
  render(<BasicComponent>Custom Label</BasicComponent>);

  expect(screen.getByText('Custom Label')).toBeInTheDocument();
});

test('supports different sizes', () => {
  const { rerender } = render(<BasicComponent size="small" />);
  let button = screen.getByRole('button');

  expect(button).toMatchInlineSnapshot(`
    <button
      aria-pressed="false"
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[color,box-shadow,transform] [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:util-focus-ring outline-none disabled:util-disabled cursor-pointer border border-input bg-background shadow-xs hover:bg-hover hover:text-foreground selected:bg-input/50 selected:shadow-none in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-l-0 in-[.group]:first:rounded-l-md in-[.group]:first:border-l in-[.group]:last:rounded-r-md text-xs h-button-small px-3 [&_svg]:size-3.5"
      data-rac=""
      data-react-aria-pressable="true"
      tabindex="0"
      type="button"
    >
      Toggle
    </button>
  `);

  rerender(<BasicComponent size="icon" />);
  expect(screen.getByRole('button')).toMatchInlineSnapshot(`
    <button
      aria-pressed="false"
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[color,box-shadow,transform] [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:util-focus-ring outline-none disabled:util-disabled cursor-pointer border border-input bg-background shadow-xs hover:bg-hover hover:text-foreground selected:bg-input/50 selected:shadow-none in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-l-0 in-[.group]:first:rounded-l-md in-[.group]:first:border-l in-[.group]:last:rounded-r-md size-button [&_svg]:size-4"
      data-rac=""
      data-react-aria-pressable="true"
      tabindex="0"
      type="button"
    >
      Toggle
    </button>
  `);
});
