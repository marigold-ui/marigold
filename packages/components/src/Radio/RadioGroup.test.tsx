import { render, screen } from '@testing-library/react';
import { Basic, CollapseAt } from './Radio.stories';

// Tests
// ---------------
test('label is optional (can use aria-label instead)', () => {
  render(<Basic.Component aria-label="With Label" />);

  expect(screen.queryByText('With Label')).not.toBeInTheDocument();
});

test('support vertical orientation by default', () => {
  render(<Basic.Component />);

  const group = screen.getByRole('radiogroup');
  expect(group).toHaveAttribute('aria-orientation', 'vertical');
});

test('support horizontal orientation', () => {
  render(<Basic.Component orientation="horizontal" />);

  const group = screen.getByTestId('group');
  expect(group).toHaveAttribute('data-orientation', 'horizontal');
});

test('vertical orientation: items keep the py-1 modifier class', () => {
  render(<Basic.Component />);

  // eslint-disable-next-line testing-library/no-node-access
  const item = screen.getByRole('radio', { name: 'Option 1' }).closest('label');
  expect(item?.className).toContain(
    'group-data-[orientation=vertical]/radiogroup:py-1'
  );
});

test('horizontal orientation: items keep the px-1.5 modifier class', () => {
  render(<Basic.Component orientation="horizontal" />);

  // eslint-disable-next-line testing-library/no-node-access
  const item = screen.getByRole('radio', { name: 'Option 1' }).closest('label');
  expect(item?.className).toContain(
    'group-data-[orientation=horizontal]/radiogroup:px-1.5'
  );
});

test('don\'t show "show more" when list is too short', () => {
  render(<CollapseAt.Component collapseAt={100} />);

  expect(screen.getByTestId('one')).toBeVisible();
  expect(screen.getByTestId('two')).toBeVisible();
  expect(screen.getByTestId('three')).toBeVisible();
  expect(screen.getByTestId('four')).toBeVisible();
  expect(screen.getByTestId('five')).toBeVisible();
  expect(screen.getByTestId('six')).toBeVisible();
  expect(screen.getByTestId('seven')).toBeVisible();
});

test('works with negative values (hides everything)', () => {
  render(<CollapseAt.Component collapseAt={-10} defaultValue={null} />);

  expect(screen.queryByTestId('one')).not.toBeVisible();
  expect(screen.queryByTestId('two')).not.toBeVisible();
  expect(screen.queryByTestId('three')).not.toBeVisible();
  expect(screen.queryByTestId('four')).not.toBeVisible();
  expect(screen.queryByTestId('five')).not.toBeVisible();
  expect(screen.queryByTestId('six')).not.toBeVisible();
  expect(screen.queryByTestId('seven')).not.toBeVisible();
});

test('expand if a value would be hidden', () => {
  render(<CollapseAt.Component collapseAt={4} defaultValue="onions" />);

  expect(screen.getByTestId('one')).toBeVisible();
  expect(screen.getByTestId('two')).toBeVisible();
  expect(screen.getByTestId('three')).toBeVisible();
  expect(screen.getByTestId('four')).toBeVisible();
  expect(screen.getByTestId('five')).toBeVisible();
  expect(screen.getByTestId('six')).toBeVisible();
  expect(screen.getByTestId('seven')).toBeVisible();
});
