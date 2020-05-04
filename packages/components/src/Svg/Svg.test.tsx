import React from 'react';
import { render } from '@testing-library/react';
import { Svg } from './Svg';

test('support svg with default props', () => {
  const t1 = render(
    <Svg title="test1">
      <path d="M9.9 20.113V13.8415H14.1V20.113H19.35V11.751H22.5L12 2.34375L1.5 11.751H4.65V20.113H9.9Z" />
    </Svg>
  );
  let element1 = t1.getByTitle('test1');

  expect(element1.getAttribute('fill')).toEqual('currentcolor');
  expect(element1.getAttribute('width')).toEqual('24');
  expect(element1.getAttribute('height')).toEqual('24');
  expect(element1.getAttribute('viewBox')).toEqual('0 0 24 24');
});

test('support fill prop', () => {
  const t1 = render(
    <Svg title="test2" fill="orange">
      <path d="M9.9 20.113V13.8415H14.1V20.113H19.35V11.751H22.5L12 2.34375L1.5 11.751H4.65V20.113H9.9Z" />
    </Svg>
  );
  let element2 = t1.getByTitle('test2');

  expect(element2.getAttribute('fill')).toEqual('orange');
  expect(element2.getAttribute('width')).toEqual('24');
  expect(element2.getAttribute('height')).toEqual('24');
  expect(element2.getAttribute('viewBox')).toEqual('0 0 24 24');
});

test('support size prop', () => {
  const t1 = render(
    <Svg title="test3" size={32}>
      <path d="M9.9 20.113V13.8415H14.1V20.113H19.35V11.751H22.5L12 2.34375L1.5 11.751H4.65V20.113H9.9Z" />
    </Svg>
  );
  let element3 = t1.getByTitle('test3');

  expect(element3.getAttribute('fill')).toEqual('currentcolor');
  expect(element3.getAttribute('width')).toEqual('32');
  expect(element3.getAttribute('height')).toEqual('32');
  expect(element3.getAttribute('viewBox')).toEqual('0 0 24 24');
});
