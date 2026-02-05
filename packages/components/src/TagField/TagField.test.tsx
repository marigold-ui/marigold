import { render, screen } from '@testing-library/react';
import { Basic, Controlled, Disabled, WithError } from './TagField.stories';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});

test('renders a field (label, helptext, tagfield)', () => {
  render(
    <Basic.Component
      label="Label"
      errorMessage="ERRR!"
      description="Description"
    />
  );

  const label = screen.queryAllByText('Label')[0];
  const description = screen.queryAllByText('Description')[0];
  const errorMessage = screen.queryByText('ERRR!');

  expect(label).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(errorMessage).not.toBeInTheDocument();
});

test('placeholder is rendered when no items are selected', () => {
  render(<Basic.Component label="Label" placeholder="Pick items" />);

  const placeholder = screen.getByText('Pick items');

  expect(placeholder).toBeInTheDocument();
});

test('allows to disable the field', () => {
  render(<Disabled.Component />);

  const button = screen.getByRole('button');

  expect(button).toBeDisabled();
});

test('selected items appear as tags', () => {
  render(<Controlled.Component />);

  const rockTag = screen.getAllByText('Rock')[0];
  const popTag = screen.getAllByText('Pop')[0];

  expect(rockTag).toBeInTheDocument();
  expect(popTag).toBeInTheDocument();
});

test('error state shows error message', () => {
  render(<WithError.Component />);

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Genres')[0].parentElement;
  const errorMessage = screen.getByText('Please select at least one genre.');

  expect(container).toHaveAttribute('data-error');
  expect(errorMessage).toBeInTheDocument();
});

test('set width via props', () => {
  render(<Basic.Component label="Label" width="1/2" />);

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;

  expect(container?.className).toContain('w-1/2');
});
