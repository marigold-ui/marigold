import { render, screen } from '@testing-library/react';
import React from 'react';

import { Percentage } from './Percentage';

test('renders value in percentage', () => {
  render(<Percentage value={0.2} />);
  const percentage = screen.getByText('20%');
  expect(percentage).toBeInTheDocument();
});
