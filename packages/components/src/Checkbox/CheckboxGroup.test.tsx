import { render, screen } from '@testing-library/react';
import { Basic, CollapseAt, Error } from './CheckboxGroup.stories';

test('renders label and group of checkboxes', () => {
  render(<Basic.Component />);

  expect(screen.getByText('This is a label')).toBeInTheDocument();
  expect(screen.getByText('Ham')).toBeInTheDocument();
  expect(screen.getByText('Salami')).toBeInTheDocument();
  expect(screen.getByText('Cheese')).toBeInTheDocument();
  expect(screen.getByText('Tomate')).toBeInTheDocument();
  expect(screen.getByText('Cucumber')).toBeInTheDocument();
  expect(screen.getByText('Onions')).toBeInTheDocument();
  expect(screen.getAllByRole('checkbox').length).toBe(6);
});

test('label is optional (can use aria-label instead)', () => {
  render(<Basic.Component aria-label="Aria Label" />);

  expect(screen.queryByText('Group of Checkboxes')).not.toBeInTheDocument();
  expect(screen.getByLabelText('Aria Label')).toBeInTheDocument();
});

test('applies group styles from theme', () => {
  render(<Basic.Component />);

  const group = screen.getByRole('group');

  expect(group.className).toMatchInlineSnapshot(
    `"group/field flex flex-col w-full space-y-2 gap-x-2"`
  );
});

test('passes down "disabled" to checkboxes', () => {
  render(<Basic.Component disabled />);

  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('one')!.querySelector('input')).toBeDisabled();
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('two')!.querySelector('input')).toBeDisabled();
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('three')!.querySelector('input')).toBeDisabled();
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('four')!.querySelector('input')).toBeDisabled();
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('five')!.querySelector('input')).toBeDisabled();
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('six')!.querySelector('input')).toBeDisabled();
});

test('passes down "read-only" to checkboxes', () => {
  render(<Basic.Component readOnly />);

  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('one')!.querySelector('input')).toHaveAttribute(
    'aria-readonly',
    'true'
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('two')!.querySelector('input')).toHaveAttribute(
    'aria-readonly',
    'true'
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('three')!.querySelector('input')).toHaveAttribute(
    'aria-readonly',
    'true'
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('four')!.querySelector('input')).toHaveAttribute(
    'aria-readonly',
    'true'
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('five')!.querySelector('input')).toHaveAttribute(
    'aria-readonly',
    'true'
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('six')!.querySelector('input')).toHaveAttribute(
    'aria-readonly',
    'true'
  );
});

test('passes down "error" to checkboxes', () => {
  render(<Basic.Component error />);

  // Bug in `react-aria-components` props are spread on input AND label...
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('one')!.querySelector('input')).toHaveAttribute(
    'aria-invalid',
    'true'
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('two')!.querySelector('input')).toHaveAttribute(
    'aria-invalid',
    'true'
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('three')!.querySelector('input')).toHaveAttribute(
    'aria-invalid',
    'true'
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('four')!.querySelector('input')).toHaveAttribute(
    'aria-invalid',
    'true'
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('five')!.querySelector('input')).toHaveAttribute(
    'aria-invalid',
    'true'
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByTestId('six')!.querySelector('input')).toHaveAttribute(
    'aria-invalid',
    'true'
  );
});

test('accepts description', () => {
  render(<Basic.Component />);

  expect(screen.getByText('Choose your Options')).toBeInTheDocument();
});

test('accepts error message', () => {
  render(<Error.Component />);

  expect(screen.getByText('This is an error')).toBeInTheDocument();
});

test('horiziontal orientation style', () => {
  render(<Basic.Component orientation="horizontal" />);
  const presentation = screen
    .getAllByRole('presentation')
    .filter(
      element => element.getAttribute('data-orientation') === 'horizontal'
    );

  expect(presentation[0].className).toContain('flex-row gap-[1.5ch]');
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
  expect(screen.getByTestId('eight')).toBeVisible();
  expect(screen.getByTestId('nine')).toBeVisible();
  expect(screen.getByTestId('ten')).toBeVisible();
});

test('works with negative values (hides everything)', () => {
  render(<CollapseAt.Component collapseAt={-10} />);

  expect(screen.queryByTestId('one')).not.toBeVisible();
  expect(screen.queryByTestId('two')).not.toBeVisible();
  expect(screen.queryByTestId('three')).not.toBeVisible();
  expect(screen.queryByTestId('four')).not.toBeVisible();
  expect(screen.queryByTestId('five')).not.toBeVisible();
  expect(screen.queryByTestId('six')).not.toBeVisible();
  expect(screen.queryByTestId('seven')).not.toBeVisible();
  expect(screen.queryByTestId('eight')).not.toBeVisible();
  expect(screen.queryByTestId('nine')).not.toBeVisible();
  expect(screen.queryByTestId('ten')).not.toBeVisible();
});

test('expand if a value would be hidden', () => {
  render(<CollapseAt.Component collapseAt={3} defaultValue={['olives']} />);

  expect(screen.getByTestId('one')).toBeVisible();
  expect(screen.getByTestId('two')).toBeVisible();
  expect(screen.getByTestId('three')).toBeVisible();
  expect(screen.getByTestId('four')).toBeVisible();
  expect(screen.getByTestId('five')).toBeVisible();
  expect(screen.getByTestId('six')).toBeVisible();
  expect(screen.getByTestId('seven')).toBeVisible();
  expect(screen.getByTestId('eight')).toBeVisible();
  expect(screen.getByTestId('nine')).toBeVisible();
  expect(screen.getByTestId('ten')).toBeVisible();
});
