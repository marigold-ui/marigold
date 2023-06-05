import React from 'react';
import { render, screen } from '@testing-library/react';

import { Box } from '../Box';
import { Center } from './Center';

test('supports classnames per default and maxWidth prop', () => {
  render(
    <Center maxWidth="50ch" data-testid="center">
      <Box>content</Box>
    </Center>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toMatchInlineSnapshot(`
    <div
      class="me-[auto] ms-[auto] box-content flex flex-col items-center justify-center gap-0 max-w-[--maxWidth]"
      data-testid="center"
      style="--maxWidth: 50ch;"
    >
      <div>
        content
      </div>
    </div>
  `);
});

test('supports maxWidth from theme sizes', () => {
  render(
    <Center maxWidth="300px" data-testid="center">
      <Box>content</Box>
    </Center>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toMatchInlineSnapshot(`
    <div
      class="me-[auto] ms-[auto] box-content flex flex-col items-center justify-center gap-0 max-w-[--maxWidth]"
      data-testid="center"
      style="--maxWidth: 300px;"
    >
      <div>
        content
      </div>
    </div>
  `);
});

test('supports space prop', () => {
  render(
    <Center space={3} data-testid="center">
      <Box>content</Box>
      <Box>content2</Box>
    </Center>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toHaveClass(`gap-3`);
});
