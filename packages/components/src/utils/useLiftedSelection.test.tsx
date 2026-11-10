import { render } from '@testing-library/react';
import type { Selection } from '@react-types/shared';
import { useLiftedSelection } from './useLiftedSelection';

const captureSelection = (
  selectedKeys?: Selection | Iterable<string>,
  defaultSelectedKeys?: Selection | Iterable<string>
) => {
  const seen: Selection[] = [];

  const Probe = () => {
    const [selection] = useLiftedSelection(selectedKeys, defaultSelectedKeys);
    seen.push(selection);
    return null;
  };

  const { rerender } = render(<Probe />);

  return { seen, rerender: () => rerender(<Probe />) };
};

test('passes a controlled Set through without copying it', () => {
  const selectedKeys = new Set(['a', 'b']);
  const { seen, rerender } = captureSelection(selectedKeys);

  rerender();

  for (const selection of seen) {
    expect(selection).toBe(selectedKeys);
  }
});

test('preserves the `all` sentinel instead of resolving it', () => {
  const { seen } = captureSelection('all');

  expect(seen[0]).toBe('all');
});

test('builds a Set from a non-Set iterable', () => {
  const { seen } = captureSelection(['a', 'b']);

  expect(seen[0]).toEqual(new Set(['a', 'b']));
});

test('falls back to an empty selection when neither prop is given', () => {
  const { seen } = captureSelection();

  expect(seen[0]).toEqual(new Set());
});
