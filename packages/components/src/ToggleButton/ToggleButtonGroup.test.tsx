import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { ToggleButton } from './ToggleButton';
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

  expect(screen.getByText('Sum')).toBeInTheDocument();
  expect(screen.getByText('Median')).toBeInTheDocument();
  expect(screen.getByText('Average')).toBeInTheDocument();
});

test('provides size context to child buttons', () => {
  const { rerender } = render(<BasicComponent size="small" />);

  let buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(3);

  // Rerender with icon size
  rerender(<BasicComponent size="icon" />);
  buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(3);
  buttons.forEach(button => expect(button).toBeInTheDocument());
});

test('respects disabled state', async () => {
  const user = userEvent.setup();
  const onSelectionChange = vi.fn();
  render(<BasicComponent disabled onSelectionChange={onSelectionChange} />);
  const buttons = screen.getAllByRole('button');

  buttons.forEach(button => expect(button).toBeDisabled());
  await user.click(buttons[0]);

  expect(onSelectionChange).not.toHaveBeenCalled();
});

test('handles defaultSelectedKeys', () => {
  render(<BasicComponent defaultSelectedKeys={['sum']}></BasicComponent>);

  const option1 = screen.getByText('Sum');
  expect(option1).toHaveAttribute('data-selected', 'true');
});

test('works in controlled mode with selectedKeys', async () => {
  const user = userEvent.setup();
  const onSelectionChange = vi.fn();

  render(
    <BasicComponent
      selectedKeys={new Set(['median'])}
      onSelectionChange={onSelectionChange}
    />
  );

  const option1 = screen.getByText('Sum');
  const option2 = screen.getByText('Median');

  expect(option1).not.toHaveAttribute('data-selected');
  expect(option2).toHaveAttribute('data-selected', 'true');

  await user.click(option2);
  expect(onSelectionChange).toHaveBeenCalled();
});

test('allows individual buttons to be disabled', async () => {
  const user = userEvent.setup();
  const onSelectionChange = vi.fn();

  render(
    <BasicComponent onSelectionChange={onSelectionChange}>
      <ToggleButton id="option1">Option 1</ToggleButton>
      <ToggleButton id="option2" disabled>
        Option 2
      </ToggleButton>
      <ToggleButton id="option3">Option 3</ToggleButton>
    </BasicComponent>
  );

  const option1 = screen.getByText('Option 1');
  const option2 = screen.getByText('Option 2');
  const option3 = screen.getByText('Option 3');

  expect(option2).toBeDisabled();
  expect(option1).not.toBeDisabled();
  expect(option3).not.toBeDisabled();

  await user.click(option2);
  expect(onSelectionChange).not.toHaveBeenCalled();

  await user.click(option1);
  expect(onSelectionChange).toHaveBeenCalled();
  expect(option1).toHaveAttribute('data-selected', 'true');
});
