import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { ToggleButtonGroupProps } from './ToggleButtonGroup';
import { Basic } from './ToggleButtonGroup.stories';

// Setup
// ---------------
const BasicComponent = (
  props: ToggleButtonGroupProps & { children?: ReactNode }
) => (
  <div id="storybook-root">
    <Basic.Component {...props} />
  </div>
);

// Tests
// ---------------
test('renders correctly with children', () => {
  render(<BasicComponent />);

  expect(screen.getByRole('radiogroup')).toMatchInlineSnapshot(`
    <div
      aria-disabled="false"
      aria-orientation="horizontal"
      class="group inline-flex rounded-md shadow-sm text-sm"
      data-orientation="horizontal"
      data-rac=""
      role="radiogroup"
    >
      <button
        aria-checked="true"
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[color,box-shadow,transform] [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:util-focus-ring outline-none disabled:util-disabled cursor-pointer border border-input bg-background shadow-xs hover:bg-hover hover:text-foreground selected:bg-input/50 selected:shadow-none in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-l-0 in-[.group]:first:rounded-l-md in-[.group]:first:border-l in-[.group]:last:rounded-r-md text-sm h-button px-4 py-2 [&_svg]:size-4"
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
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[color,box-shadow,transform] [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:util-focus-ring outline-none disabled:util-disabled cursor-pointer border border-input bg-background shadow-xs hover:bg-hover hover:text-foreground selected:bg-input/50 selected:shadow-none in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-l-0 in-[.group]:first:rounded-l-md in-[.group]:first:border-l in-[.group]:last:rounded-r-md text-sm h-button px-4 py-2 [&_svg]:size-4"
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
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[color,box-shadow,transform] [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:util-focus-ring outline-none disabled:util-disabled cursor-pointer border border-input bg-background shadow-xs hover:bg-hover hover:text-foreground selected:bg-input/50 selected:shadow-none in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-l-0 in-[.group]:first:rounded-l-md in-[.group]:first:border-l in-[.group]:last:rounded-r-md text-sm h-button px-4 py-2 [&_svg]:size-4"
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
    render(<BasicComponent size={size} />);

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
  render(<BasicComponent disabled onSelectionChange={onSelectionChange} />);

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
  render(<BasicComponent defaultSelectedKeys={['sum']}></BasicComponent>);

  const option1 = screen.getByText('Sum');

  expect(option1).toHaveAttribute('data-selected', 'true');
});

test('works with selectedKeys', async () => {
  render(<BasicComponent selectedKeys={new Set(['median'])} />);

  const option1 = screen.getByText('Sum');
  const option2 = screen.getByText('Median');

  expect(option1).not.toHaveAttribute('data-selected');
  expect(option2).toHaveAttribute('data-selected', 'true');
});
