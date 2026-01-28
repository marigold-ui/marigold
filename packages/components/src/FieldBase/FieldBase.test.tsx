import { render, screen } from '@testing-library/react';
import { FieldBaseProps } from '@marigold/components';
import { Basic } from './FieldBase.stories';

// Setup
// ---------------

const BasicComponent = (props?: Partial<FieldBaseProps<any>>) => (
  <div id="storybook-root">
    <Basic.Component {...props} />
  </div>
);

// Tests
// ---------------
test('render Field with label and helptext', () => {
  render(<BasicComponent />);
  const label = screen.getByText('This is the label');
  const description = screen.getByText('This is a help text description');
  const error = screen.queryByText('Something went wrong');

  expect(label).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(error).not.toBeInTheDocument();
});

test('render Field with label and errorMessage', () => {
  render(<BasicComponent isInvalid />);
  const label = screen.getByText('This is the label');
  const error = screen.getByText('Something went wrong');

  expect(label).toBeInTheDocument();
  expect(error).toBeInTheDocument();
});

test('render Field with label and errorMessage although description is set', () => {
  render(<BasicComponent isInvalid />);
  const label = screen.getByText('This is the label');
  const description = screen.queryByText('This is a help text description');
  const error = screen.getByText('Something went wrong');

  expect(label).toBeInTheDocument();
  expect(description).not.toBeInTheDocument();
  expect(error).toBeInTheDocument();
});

test('takes full width by default', () => {
  render(<BasicComponent />);
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('This is the label').parentElement!;

  expect(container.className).toMatchInlineSnapshot(
    `"group/field flex min-w-0 flex-col w-(--container-width)"`
  );
});

test('applies width variables for numeric width', () => {
  render(<BasicComponent width={80} />);
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('This is the label').parentElement!;

  expect(container.className).toContain('w-auto');
  expect(container.style.getPropertyValue('--container-width')).toBe(
    'calc(var(--spacing) * 80)'
  );
  expect(container.style.getPropertyValue('--field-width')).toBe(
    'calc(var(--spacing) * 80)'
  );
});

test('applies width variables for fraction width', () => {
  render(<BasicComponent width="1/2" />);
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('This is the label').parentElement!;

  expect(container.className).toContain('w-(--container-width)');
  expect(container.className).not.toContain('w-auto');
  expect(container.style.getPropertyValue('--container-width')).toBe(
    'calc((1 / 2) * 100%)'
  );
  expect(container.style.getPropertyValue('--field-width')).toBe('100%');
});
