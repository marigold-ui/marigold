import React from 'react';

import { render } from '@testing-library/react';

import Calculator from '@marigold/components/src/TestComponent/foo';

const renderTest = () => {
  const { getByTestId } = render(<div data-testid="test">test</div>);
  return { getByTestId };
};
const { getByTestId } = renderTest();
test('test', () => {
  expect(getByTestId('test')).toContainHTML('<div');
});

describe('Calculator', () => {
  it('should add two numbers together', () => {
    const calc: Calculator = new Calculator();
    expect(calc.add(2, 3)).toEqual(5);
  });
});
