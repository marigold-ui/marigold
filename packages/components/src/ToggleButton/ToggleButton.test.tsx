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
});

test('respects disabled state', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<BasicComponent disabled onChange={onChange} />);
  const button = screen.getByRole('button');

  expect(button).toBeDisabled();

  await user.click(button);
  expect(onChange).not.toHaveBeenCalled();
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

  expect(button).toBeInTheDocument();

  rerender(<BasicComponent size="icon" />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
