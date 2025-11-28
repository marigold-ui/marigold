/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Inset } from './Inset';

test('does not have a default spacing', () => {
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
  expect(inset?.className).toMatchInlineSnapshot(`"p-3"`);
});

test('allows to add horizontal spacing', () => {
  render(
    <Inset spaceX={5}>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.className).toMatchInlineSnapshot(`"px-5"`);
});

test('allows to add vertical spacing', () => {
  render(
    <Inset spaceY={8}>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset).toHaveClass(`py-8`);
});

test('allows to add different vertical/horizontal spacing', () => {
  render(
    <Inset spaceX={2} spaceY={4}>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset?.className).toMatchInlineSnapshot(`"px-2 py-4"`);
});
