import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef, useState } from 'react';
import { vi } from 'vitest';
import { useFormValidationState } from '@react-stately/form';
import type { Key, Selection, ValidationError } from '@react-types/shared';
import { HiddenSelection } from './HiddenSelection';

interface HarnessProps {
  name?: string;
  form?: string;
  disabled?: boolean;
  required?: boolean;
  selectionMode: 'single' | 'multiple';
  defaultSelection?: Selection | Iterable<Key>;
  validationBehavior?: 'aria' | 'native';
  validate?: (value: Key[]) => ValidationError | true | null;
  onChange?: (selection: Selection) => void;
}

const Harness = ({
  name,
  form,
  disabled,
  required,
  selectionMode,
  defaultSelection,
  validationBehavior = 'native',
  validate,
  onChange,
}: HarnessProps) => {
  const [selection, setSelection] = useState<Selection>(() =>
    defaultSelection === 'all' ? 'all' : new Set(defaultSelection ?? [])
  );
  const focusRef = useRef<HTMLButtonElement>(null);

  const validationState = useFormValidationState<Key[]>({
    name,
    value: selection === 'all' ? [] : Array.from(selection),
    validate,
    validationBehavior,
  });

  return (
    <>
      <button ref={focusRef} type="button">
        focus target
      </button>
      <HiddenSelection
        name={name}
        form={form}
        disabled={disabled}
        required={required}
        selectionMode={selectionMode}
        selection={selection}
        onSelectionChange={value => {
          setSelection(value);
          onChange?.(value);
        }}
        validationBehavior={validationBehavior}
        validationState={validationState}
        focusRef={focusRef}
      />
    </>
  );
};

// The <select> is intentionally `aria-hidden` and lives inside VisuallyHidden,
// so it's invisible to accessible queries — `querySelector` is the right tool.
const getSelect = () =>
  // eslint-disable-next-line testing-library/no-node-access
  document.querySelector('select') as HTMLSelectElement | null;

test('renders a hidden <select> that is not user-focusable', () => {
  render(<Harness selectionMode="single" />);

  const select = getSelect();

  expect(select).not.toBeNull();
  expect(select!.tabIndex).toBe(-1);
  expect(select!.getAttribute('aria-hidden')).toBe('true');
});

test('single mode: omits the `multiple` attribute', () => {
  render(<Harness selectionMode="single" defaultSelection={['a']} />);

  const select = getSelect()!;

  expect(select.multiple).toBe(false);
  expect(select.value).toBe('a');
});

test('multiple mode: sets `multiple` and reflects all selected keys', () => {
  render(<Harness selectionMode="multiple" defaultSelection={['a', 'b']} />);

  const select = getSelect()!;
  const selected = Array.from(select.selectedOptions).map(o => o.value);

  expect(select.multiple).toBe(true);
  expect(selected).toEqual(['a', 'b']);
});

test('selection "all" submits no values', () => {
  render(<Harness selectionMode="multiple" defaultSelection="all" />);

  expect(Array.from(getSelect()!.selectedOptions)).toHaveLength(0);
});

test('disabled prop is forwarded to the <select>', () => {
  render(<Harness selectionMode="single" disabled />);

  expect(getSelect()!.disabled).toBe(true);
});

test('required + validationBehavior="native" applies the required attribute', () => {
  render(
    <Harness selectionMode="multiple" required validationBehavior="native" />
  );

  expect(getSelect()!.required).toBe(true);
});

test('required + validationBehavior="aria" does not apply the required attribute', () => {
  render(
    <Harness selectionMode="multiple" required validationBehavior="aria" />
  );

  expect(getSelect()!.required).toBe(false);
});

test('name and form props are forwarded', () => {
  render(
    <Harness
      selectionMode="multiple"
      name="categories"
      form="my-form"
      defaultSelection={['a']}
    />
  );

  const select = getSelect()!;

  expect(select.getAttribute('name')).toBe('categories');
  expect(select.getAttribute('form')).toBe('my-form');
});

test('participates in native form submission via FormData', async () => {
  let entries: string[] = [];
  const onSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    entries = new FormData(e.currentTarget).getAll('categories') as string[];
  });

  render(
    <form onSubmit={onSubmit}>
      <Harness
        selectionMode="multiple"
        name="categories"
        defaultSelection={['a', 'b']}
      />
      <button type="submit">Submit</button>
    </form>
  );

  await userEvent.click(screen.getByText('Submit'));

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(entries).toEqual(['a', 'b']);
});

test('autofill / change events route back through onSelectionChange', () => {
  const onChange = vi.fn();
  render(
    <Harness
      selectionMode="multiple"
      defaultSelection={['a', 'b']}
      onChange={onChange}
    />
  );

  // Simulate the browser changing the selection (e.g. form reset, autofill).
  const select = getSelect()!;
  Array.from(select.options).forEach(option => {
    option.selected = option.value === 'a';
  });
  select.dispatchEvent(new Event('change', { bubbles: true }));

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(new Set(['a']));
});
