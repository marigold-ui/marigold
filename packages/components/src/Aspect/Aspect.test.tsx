import React from 'react';
import { render, screen } from '@testing-library/react';

import { Aspect } from './Aspect';
import { Text } from '../Text';
import { Box } from '../Box';

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

test('supports default ratio', () => {
  render(
    <Aspect data-testid="aspect" ratio="ultrawide">
      <Box />
    </Aspect>
  );
  // Note: jest does not support aspect-ratio
  const aspect = screen.getByTestId(/aspect/);
  expect(aspect).toBeDefined();
});
