import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Basic } from './ToggleButtonGroup.stories';

test('renders correctly with children', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('radiogroup')).toMatchInlineSnapshot(`
    <div
      aria-disabled="false"
      aria-orientation="horizontal"
      class="group inline-flex overflow-hidden ui-surface shadow-elevation-border text-sm"
      data-orientation="horizontal"
      data-rac=""
      role="radiogroup"
    >
      <button
        aria-checked="true"
        class="ui-button-base gap-2 ui-surface shadow-elevation-border hover:[--ui-background-color:var(--color-hover)] hover:[--ui-border-color:oklch(from_var(--color-border)_calc(l-0.1)_c_h)] hover:text-foreground selected:[--ui-background-color:var(--color-selected-bold)] selected:text-selected-bold-foreground selected:shadow-none disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled-surface)] in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-y-0 in-[.group]:border-l-0 in-[.group]:last:border-r-0 in-[.group]:hover:[--ui-border-color:initial] in-[.group]:disabled:border-r-border in-[.group]:focus-visible:z-10 text-sm h-control px-4 py-2 [&_svg]:size-4"
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
        class="ui-button-base gap-2 ui-surface shadow-elevation-border hover:[--ui-background-color:var(--color-hover)] hover:[--ui-border-color:oklch(from_var(--color-border)_calc(l-0.1)_c_h)] hover:text-foreground selected:[--ui-background-color:var(--color-selected-bold)] selected:text-selected-bold-foreground selected:shadow-none disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled-surface)] in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-y-0 in-[.group]:border-l-0 in-[.group]:last:border-r-0 in-[.group]:hover:[--ui-border-color:initial] in-[.group]:disabled:border-r-border in-[.group]:focus-visible:z-10 text-sm h-control px-4 py-2 [&_svg]:size-4"
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
        class="ui-button-base gap-2 ui-surface shadow-elevation-border hover:[--ui-background-color:var(--color-hover)] hover:[--ui-border-color:oklch(from_var(--color-border)_calc(l-0.1)_c_h)] hover:text-foreground selected:[--ui-background-color:var(--color-selected-bold)] selected:text-selected-bold-foreground selected:shadow-none disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled-surface)] in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-y-0 in-[.group]:border-l-0 in-[.group]:last:border-r-0 in-[.group]:hover:[--ui-border-color:initial] in-[.group]:disabled:border-r-border in-[.group]:focus-visible:z-10 text-sm h-control px-4 py-2 [&_svg]:size-4"
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
