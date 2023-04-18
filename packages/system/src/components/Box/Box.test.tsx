import React from 'react';
import { render, screen } from '@testing-library/react';

import { Box } from './Box';

test('renders a <div> by default', () => {
  render(<Box>Test</Box>);
  const testelem = screen.getByText('Test');

  expect(testelem instanceof HTMLDivElement).toBeTruthy();
});

test('changes rendered element via "as" prop', () => {
  render(<Box as="p">Test</Box>);
  const testelem = screen.getByText('Test');

  expect(testelem instanceof HTMLParagraphElement).toBeTruthy();
});

test('supports custom className', () => {
  render(<Box className="my-custom-class">Test</Box>);
  const element = screen.getByText('Test');

  expect(element.getAttribute('class')).toMatch('my-custom-class');
});

test('passes down HTML attributes', () => {
  render(
    <Box title="my-custom-title" id="element-id">
      Test
    </Box>
  );
  const element = screen.getByText('Test');

  expect(element.getAttribute('title')).toMatch('my-custom-title');
  expect(element.getAttribute('id')).toEqual('element-id');
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <Box as="button" ref={ref}>
      button
    </Box>
  );

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});
