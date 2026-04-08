/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Inset } from './Inset';

test('does not have spacing by default', () => {
  render(
    <Inset>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.className).toMatchInlineSnapshot(`""`);
});

test('allows to add spacing equally on all sides', () => {
  render(
    <Inset space={3}>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.style.getPropertyValue('--space')).toBe(
    'calc(var(--spacing) * 3)'
  );
});

test('allows to add horizontal spacing', () => {
  render(
    <Inset spaceX={5}>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.style.getPropertyValue('--spaceX')).toBe(
    'calc(var(--spacing) * 5)'
  );
});

test('allows to add vertical spacing', () => {
  render(
    <Inset spaceY={8}>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.style.getPropertyValue('--spaceY')).toBe(
    'calc(var(--spacing) * 8)'
  );
});

test('allows to add different vertical/horizontal spacing', () => {
  render(
    <Inset spaceX={2} spaceY={4}>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.style.getPropertyValue('--spaceX')).toBe(
    'calc(var(--spacing) * 2)'
  );
  expect(inset?.style.getPropertyValue('--spaceY')).toBe(
    'calc(var(--spacing) * 4)'
  );
});

test('supports semantic inset spacing tokens for space', () => {
  render(
    <Inset space="square-regular">
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.style.getPropertyValue('--space')).toBe(
    'var(--spacing-square-regular)'
  );
});

test('supports semantic relational tokens for spaceX/spaceY', () => {
  render(
    <Inset spaceX="related" spaceY="group">
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.style.getPropertyValue('--spaceX')).toBe(
    'var(--spacing-related)'
  );
  expect(inset?.style.getPropertyValue('--spaceY')).toBe(
    'var(--spacing-group)'
  );
});
