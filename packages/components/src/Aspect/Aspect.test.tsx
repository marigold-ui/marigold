import React from 'react';
import { render, screen } from '@testing-library/react';

import { Aspect } from './Aspect';

test('supports  maxWidth', () => {
  render(<Aspect maxWidth="50vw">aspect</Aspect>);
  const aspect = screen.getByText('aspect');
  expect(aspect).toHaveStyle(`maxWidth: 50vw`);
});

// Note: jest does not support aspect-ratio so we can not really test ist here...

test('supports default ratio', () => {
  render(<Aspect ratio="ultrawide">aspect</Aspect>);
  const aspect = screen.getByText('aspect');
  expect(aspect).toBeInTheDocument();
});
