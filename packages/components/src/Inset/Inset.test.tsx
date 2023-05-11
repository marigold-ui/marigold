/* eslint-disable testing-library/no-node-access */
import React from 'react';
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
  expect(inset).toMatchInlineSnapshot(`
    <div
      class="px-0 py-0"
    >
      <p>
        first
      </p>
      <p>
        second
      </p>
    </div>
  `);
});

test('allows to add spacing equally on all sides', () => {
  render(
    <Inset space={3}>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset).toHaveClass(`p-3`);
});

test('allows to add horizontal spacing', () => {
  render(
    <Inset spaceX={5}>
      <p>first</p>
      <p>second</p>
    </Inset>
  );
  const inset = screen.getByText('first').parentElement;
  expect(inset).toHaveClass(`px-5 py-0`);
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
  expect(inset).toMatchInlineSnapshot(`
    <div
      class="px-2 py-4"
    >
      <p>
        first
      </p>
      <p>
        second
      </p>
    </div>
  `);
});
