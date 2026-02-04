import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Basic } from './ToggleButtonGroup.stories';

test('renders correctly with children', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('radiogroup')).toMatchInlineSnapshot(`
    <div
      aria-disabled="false"
      aria-orientation="horizontal"
      class="group inline-flex ui-surface text-sm"
      data-orientation="horizontal"
      data-rac=""
      role="radiogroup"
    >
      <button
        aria-checked="true"
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-surface font-medium transition-[color,box-shadow,transform] [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:ui-state-focus outline-none disabled:ui-state-disabled cursor-pointer ui-surface hover:[--ui-background-color:var(--color-hover)] hover:text-foreground disabled:border-0 disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled)] selected:[--ui-background-color:var(--color-input)] selected:shadow-none in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-y-0 in-[.group]:border-l-0 in-[.group]:first:rounded-l-surface in-[.group]:last:rounded-r-surface in-[.group]:last:border-r-0 text-sm h-button px-4 py-2 [&_svg]:size-4"
        data-rac=""
        data-react-aria-pressable="true"
        data-selected="true"
        role="radio"
        tabindex="0"
        type="button"
      >
        Sum
      </button>
      <button
        aria-checked="false"
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-surface font-medium transition-[color,box-shadow,transform] [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:ui-state-focus outline-none disabled:ui-state-disabled cursor-pointer ui-surface hover:[--ui-background-color:var(--color-hover)] hover:text-foreground disabled:border-0 disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled)] selected:[--ui-background-color:var(--color-input)] selected:shadow-none in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-y-0 in-[.group]:border-l-0 in-[.group]:first:rounded-l-surface in-[.group]:last:rounded-r-surface in-[.group]:last:border-r-0 text-sm h-button px-4 py-2 [&_svg]:size-4"
        data-rac=""
        data-react-aria-pressable="true"
        role="radio"
        tabindex="0"
        type="button"
      >
        Median
      </button>
      <button
        aria-checked="false"
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-surface font-medium transition-[color,box-shadow,transform] [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:ui-state-focus outline-none disabled:ui-state-disabled cursor-pointer ui-surface hover:[--ui-background-color:var(--color-hover)] hover:text-foreground disabled:border-0 disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled)] selected:[--ui-background-color:var(--color-input)] selected:shadow-none in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-y-0 in-[.group]:border-l-0 in-[.group]:first:rounded-l-surface in-[.group]:last:rounded-r-surface in-[.group]:last:border-r-0 text-sm h-button px-4 py-2 [&_svg]:size-4"
        data-rac=""
        data-react-aria-pressable="true"
        role="radio"
        tabindex="0"
        type="button"
      >
        Average
      </button>
    </div>
  `);
});

test.each([{ size: 'small' }, { size: 'icon' }])(
  'provides size context to child buttons with size=$size',
  ({ size }) => {
    render(<Basic.Component size={size} />);

    const sumButton = screen.getByText('Sum');
    const medianButton = screen.getByText('Median');
    const averageButton = screen.getByText('Average');

    expect(sumButton).toBeInTheDocument();
    expect(medianButton).toBeInTheDocument();
    expect(averageButton).toBeInTheDocument();
  }
);

test('respects disabled state', async () => {
  const user = userEvent.setup();
  const onSelectionChange = vi.fn();
  render(<Basic.Component disabled onSelectionChange={onSelectionChange} />);

  const sumButton = screen.getByText('Sum');
  const medianButton = screen.getByText('Median');
  const averageButton = screen.getByText('Average');

  await user.click(sumButton);

  expect(sumButton).toBeDisabled();
  expect(medianButton).toBeDisabled();
  expect(averageButton).toBeDisabled();
  expect(onSelectionChange).not.toHaveBeenCalled();
});

test('handles defaultSelectedKeys', () => {
  render(<Basic.Component defaultSelectedKeys={['sum']} />);

  const option1 = screen.getByText('Sum');

  expect(option1).toHaveAttribute('data-selected', 'true');
});
