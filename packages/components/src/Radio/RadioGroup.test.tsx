import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Radio.stories';

const { Basic, CollapseAt } = composeStories(stories);

// There is no real accesible way to get to the element that acts as radio
const getVisibleRadios = () => {
  const label = screen.getByText('With Label');
  // eslint-disable-next-line testing-library/no-node-access
  return label.parentElement?.querySelectorAll('[aria-hidden="true"]');
};

// Tests
// ---------------
test('label is optional (can use aria-label instead)', () => {
  render(<Basic aria-label="With Label" />);

  expect(screen.queryByText('With Label')).not.toBeInTheDocument();
});

test('support vertical orientation by default', () => {
  render(<Basic />);

  const group = screen.getByRole('radiogroup');
  expect(group).toHaveAttribute('aria-orientation', 'vertical');
});

test('support horizontal orientation', () => {
  render(<Basic orientation="horizontal" />);

  const group = screen.getByTestId('group');
  expect(group).toHaveAttribute('data-orientation', 'horizontal');
});

test('don\'t show "show more" when list is too short', () => {
  render(<CollapseAt collapseAt={100} />);

  expect(screen.getByTestId('one')).toBeVisible();
  expect(screen.getByTestId('two')).toBeVisible();
  expect(screen.getByTestId('three')).toBeVisible();
  expect(screen.getByTestId('four')).toBeVisible();
  expect(screen.getByTestId('five')).toBeVisible();
  expect(screen.getByTestId('six')).toBeVisible();
  expect(screen.getByTestId('seven')).toBeVisible();
});

test('works with negative values (hides everything)', () => {
  render(<CollapseAt collapseAt={-10} defaultValue={null} />);

  expect(screen.queryByTestId('one')).not.toBeVisible();
  expect(screen.queryByTestId('two')).not.toBeVisible();
  expect(screen.queryByTestId('three')).not.toBeVisible();
  expect(screen.queryByTestId('four')).not.toBeVisible();
  expect(screen.queryByTestId('five')).not.toBeVisible();
  expect(screen.queryByTestId('six')).not.toBeVisible();
  expect(screen.queryByTestId('seven')).not.toBeVisible();
});

test('expand if a value would be hidden', () => {
  render(<CollapseAt collapseAt={4} defaultValue="onions" />);

  expect(screen.getByTestId('one')).toBeVisible();
  expect(screen.getByTestId('two')).toBeVisible();
  expect(screen.getByTestId('three')).toBeVisible();
  expect(screen.getByTestId('four')).toBeVisible();
  expect(screen.getByTestId('five')).toBeVisible();
  expect(screen.getByTestId('six')).toBeVisible();
  expect(screen.getByTestId('seven')).toBeVisible();
});
