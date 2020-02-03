import React from 'react';

import { render } from '@testing-library/react';

const renderTest = () => {
  const { getByTestId } = render(
    <div data-testid='test'>test</div>
  );
  return { getByTestId };
};

const { getByTestId } = renderTest();

test('test', () => {
  expect(getByTestId('test')).toContainHTML('<div')
});
