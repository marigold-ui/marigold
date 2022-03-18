import React from 'react';
import { render, screen } from '@testing-library/react';

import { Aspect } from './Aspect';
import { Text } from '../Text';
import { Box } from '../Box';

test('supports default ratio', () => {
  render(
    <Aspect data-testid="aspect">
      <Box />
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  // eslint-disable-next-line testing-library/no-node-access
  expect(aspect.previousElementSibling).toHaveStyle(`aspect-ratio: 4/3`);
});

test('supports other ratio than default', () => {
  render(
    <Aspect ratio="ultrawide" data-testid="aspect">
      <Box />
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  // eslint-disable-next-line testing-library/no-node-access
  console.log(aspect.previousElementSibling);
  // eslint-disable-next-line testing-library/no-node-access
  console.log(aspect.previousSibling);
  // eslint-disable-next-line testing-library/no-node-access
  expect(aspect).toHaveStyle(`aspectRatio: 18/5`);
});

test('supports default maxWidth', () => {
  render(
    <Aspect data-testid="aspect">
      <Text>sdf</Text>
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  // eslint-disable-next-line testing-library/no-node-access
  expect(aspect.parentElement).toHaveStyle(`maxWidth: 100%`);
});

test('supports other maxWidth than default', () => {
  render(
    <Aspect maxWidth="50vw" data-testid="aspect">
      <Text>sdf</Text>
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  // eslint-disable-next-line testing-library/no-node-access
  expect(aspect.parentElement).toHaveStyle(`maxWidth: 50vw`);
});
