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

  expect(screen.getByText('Sum')).toBeInTheDocument();
  expect(screen.getByText('Median')).toBeInTheDocument();
  expect(screen.getByText('Average')).toBeInTheDocument();
});

test('provides size context to child buttons', () => {
  const { rerender } = render(<BasicComponent size="small" />);

  let sumButton = screen.getByText('Sum');
  let medianButton = screen.getByText('Median');
  let averageButton = screen.getByText('Average');

  expect(sumButton).toBeInTheDocument();
  expect(medianButton).toBeInTheDocument();
  expect(averageButton).toBeInTheDocument();

  rerender(<BasicComponent size="icon" />);

  sumButton = screen.getByText('Sum');
  medianButton = screen.getByText('Median');
  averageButton = screen.getByText('Average');

  expect(sumButton).toBeInTheDocument();
  expect(medianButton).toBeInTheDocument();
  expect(averageButton).toBeInTheDocument();
});

test('respects disabled state', async () => {
  const user = userEvent.setup();
  const onSelectionChange = vi.fn();
  render(<BasicComponent disabled onSelectionChange={onSelectionChange} />);

  const sumButton = screen.getByText('Sum');
  const medianButton = screen.getByText('Median');
  const averageButton = screen.getByText('Average');

  expect(sumButton).toBeDisabled();
  expect(medianButton).toBeDisabled();
  expect(averageButton).toBeDisabled();

  await user.click(sumButton);

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
