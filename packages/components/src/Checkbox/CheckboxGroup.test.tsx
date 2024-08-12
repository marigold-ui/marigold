import { fireEvent, screen } from '@testing-library/react';
import { Theme, cva } from '@marigold/system';
import { FieldGroup } from '../FieldBase';
import { setup } from '../test.utils';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const theme: Theme = {
  name: 'checkbox group testing',
  components: {
    Checkbox: {
      container: cva([], {
        variants: {
          size: {
            small: 'text-sm',
          },
        },
      }),
      label: cva(
        'data-[disabled]:text-checkbox-label-disabled leading-[1.125]'
      ),
      checkbox: cva([
        'border-checkbox-base-border bg-checkbox-base-background rounded-[2] p-0.5',
        'data-[hover]:border-checkbox-base-hover',
        'data-[focus]:outline-checkbox-base-focus data-[focus]:outline-offset[3] data-[focus]:outline data-[focus]:outline-2',
        'data-[checked]:border-checkbox-base-checked data-[checked]:bg-checkbox-base-checkedBackground data-[checked]:text-white',
        'data-[indeterminate]:border-checkbox-base-indeterminate data-[indeterminate]:bg-checkbox-base-indeterminateBackground data-[indeterminate]:text-white',
        'data-[disabled]:border-checkbox-base-disabled data-[disabled]:bg-checkbox-base-disabledBackground',
      ]),
      group: cva('pt-2'),
    },
    Field: cva(),
    Label: { container: cva(), indicator: cva() },
    HelpText: {
      container: cva(''),
      icon: cva(''),
    },
  },
};

const { render } = setup({ theme });

test('renders label and group of checkboxes', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes">
      <Checkbox value="one">one</Checkbox>
      <Checkbox value="two">two</Checkbox>
      <Checkbox value="three">three</Checkbox>
    </CheckboxGroup>
  );

  expect(screen.getByText('Group of Checkboxes')).toBeInTheDocument();
  expect(screen.getByText('one')).toBeInTheDocument();
  expect(screen.getByText('two')).toBeInTheDocument();
  expect(screen.getByText('three')).toBeInTheDocument();
});

test('label is optional (can use aria-label instead)', () => {
  render(
    <CheckboxGroup aria-label="Aria Label">
      <Checkbox value="one">one</Checkbox>
      <Checkbox value="two">two</Checkbox>
      <Checkbox value="three">three</Checkbox>
    </CheckboxGroup>
  );

  expect(screen.queryByText('Group of Checkboxes')).not.toBeInTheDocument();
  expect(screen.getByText('one')).toBeInTheDocument();
  expect(screen.getByText('two')).toBeInTheDocument();
  expect(screen.getByText('three')).toBeInTheDocument();
});

test('applies group styles from theme', () => {
  render(
    <CheckboxGroup aria-label="With Label">
      <Checkbox value="one">one</Checkbox>
      <Checkbox value="two">two</Checkbox>
      <Checkbox value="three">three</Checkbox>
    </CheckboxGroup>
  );

  const group = screen.getByRole('group');
  expect(group.className).toContain('pt-2');
});

test('passes down "disabled" to checkboxes', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes" disabled>
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
      <Checkbox value="two" data-testid="two">
        two
      </Checkbox>
      <Checkbox value="three" data-testid="three">
        three
      </Checkbox>
    </CheckboxGroup>
  );

  // Bug in `react-aria-components` props are spread on input AND label...
  expect(screen.getAllByTestId('one')[1]).toBeDisabled();
  expect(screen.getAllByTestId('two')[1]).toBeDisabled();
  expect(screen.getAllByTestId('three')[1]).toBeDisabled();
});

test('passes down "read-only" to checkboxes', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes" readOnly>
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
      <Checkbox value="two" data-testid="two">
        two
      </Checkbox>
      <Checkbox value="three" data-testid="three">
        three
      </Checkbox>
    </CheckboxGroup>
  );

  // Bug in `react-aria-components` props are spread on input AND label...
  expect(screen.getAllByTestId('one')[1]).toHaveAttribute(
    'aria-readonly',
    'true'
  );
  expect(screen.getAllByTestId('two')[1]).toHaveAttribute(
    'aria-readonly',
    'true'
  );
  expect(screen.getAllByTestId('three')[1]).toHaveAttribute(
    'aria-readonly',
    'true'
  );
});

test('passes down "error" to checkboxes', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes" error>
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
      <Checkbox value="two" data-testid="two">
        two
      </Checkbox>
      <Checkbox value="three" data-testid="three">
        three
      </Checkbox>
    </CheckboxGroup>
  );

  // Bug in `react-aria-components` props are spread on input AND label...
  expect(screen.getAllByTestId('one')[1]).toHaveAttribute(
    'aria-invalid',
    'true'
  );
  expect(screen.getAllByTestId('two')[1]).toHaveAttribute(
    'aria-invalid',
    'true'
  );
  expect(screen.getAllByTestId('three')[1]).toHaveAttribute(
    'aria-invalid',
    'true'
  );
});

test('controlled', () => {
  const onChange = jest.fn();
  render(
    <CheckboxGroup label="Group of Checkboxes" onChange={onChange}>
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
      <Checkbox value="two" data-testid="two">
        two
      </Checkbox>
      <Checkbox value="three" data-testid="three">
        three
      </Checkbox>
    </CheckboxGroup>
  );

  fireEvent.click(screen.getAllByTestId('one')[1]);
  expect(onChange).toHaveBeenCalledWith(['one']);

  fireEvent.click(screen.getAllByTestId('three')[1]);
  expect(onChange).toHaveBeenCalledWith(['one', 'three']);

  fireEvent.click(screen.getAllByTestId('two')[1]);
  expect(onChange).toHaveBeenCalledWith(['one', 'three', 'two']);

  fireEvent.click(screen.getAllByTestId('three')[1]);
  expect(onChange).toHaveBeenCalledWith(['one', 'two']);
});

test('accepts description', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes" description="My description">
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
      <Checkbox value="two" data-testid="two">
        two
      </Checkbox>
      <Checkbox value="three" data-testid="three">
        three
      </Checkbox>
    </CheckboxGroup>
  );

  expect(screen.getByText('My description')).toBeInTheDocument();
});

test('accepts error message', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes" error errorMessage="My Error">
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
      <Checkbox value="two" data-testid="two">
        two
      </Checkbox>
      <Checkbox value="three" data-testid="three">
        three
      </Checkbox>
    </CheckboxGroup>
  );

  expect(screen.getByText('My Error')).toBeInTheDocument();
});

test('works with a <FieldGroup>', () => {
  render(
    <FieldGroup labelWidth="100px">
      <CheckboxGroup label="Group of Checkboxes">
        <Checkbox value="one">one</Checkbox>
        <Checkbox value="two">two</Checkbox>
        <Checkbox value="three">three</Checkbox>
      </CheckboxGroup>
    </FieldGroup>
  );

  expect(screen.getByText('Group of Checkboxes')).toBeInTheDocument();
  expect(screen.getByText('one')).toBeInTheDocument();
  expect(screen.getByText('two')).toBeInTheDocument();
  expect(screen.getByText('three')).toBeInTheDocument();
});

test('horiziontal orientation style', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes" orientation="horizontal">
      <Checkbox value="one">one</Checkbox>
      <Checkbox value="two">two</Checkbox>
      <Checkbox value="three">three</Checkbox>
    </CheckboxGroup>
  );
  const presentation = screen
    .getAllByRole('presentation')
    .filter(
      element => element.getAttribute('data-orientation') === 'horizontal'
    );

  expect(presentation[0].className).toContain('flex-row gap-[1.5ch]');
});

test('pass down variant and size to <Checkbox>', () => {
  render(
    <CheckboxGroup label="Group of Checkboxes" size="small">
      <Checkbox value="one" data-testid="one">
        one
      </Checkbox>
    </CheckboxGroup>
  );

  const one = screen
    .getAllByTestId('one')
    .filter(el => el.classList.contains('group/checkbox'))[0];

  expect(one).toHaveClass('text-sm');
});
