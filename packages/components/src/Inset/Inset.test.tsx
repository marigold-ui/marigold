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
    <Inset p={3}>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.style.getPropertyValue('--inset-p')).toBe(
    'calc(var(--spacing) * 3)'
  );
});

test('allows to add horizontal spacing', () => {
  render(
    <Inset px={5}>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.style.getPropertyValue('--inset-px')).toBe(
    'calc(var(--spacing) * 5)'
  );
});

test('allows to add vertical spacing', () => {
  render(
    <Inset py={8}>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.style.getPropertyValue('--inset-py')).toBe(
    'calc(var(--spacing) * 8)'
  );
});

test('allows to add different vertical/horizontal spacing', () => {
  render(
    <Inset px={2} py={4}>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.style.getPropertyValue('--inset-px')).toBe(
    'calc(var(--spacing) * 2)'
  );
  expect(inset?.style.getPropertyValue('--inset-py')).toBe(
    'calc(var(--spacing) * 4)'
  );
});

test('supports inset recipe tokens for p', () => {
  render(
    <Inset p="square-regular">
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.style.getPropertyValue('--inset-p')).toBe(
    'var(--spacing-square-regular)'
  );
});

test('forwards aria attributes to the rendered element', () => {
  render(
    <Inset p={2} aria-label="content region" role="region">
      <p>first</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset).toHaveAttribute('aria-label', 'content region');
  expect(inset).toHaveAttribute('role', 'region');
});

test('supports semantic padding tokens for px/py', () => {
  render(
    <Inset px="padding-snug" py="padding-relaxed">
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.style.getPropertyValue('--inset-px')).toBe(
    'var(--spacing-padding-snug)'
  );
  expect(inset?.style.getPropertyValue('--inset-py')).toBe(
    'var(--spacing-padding-relaxed)'
  );
});
