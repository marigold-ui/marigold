import React from 'react';
import { render } from '@testing-library/react';
import { Svg } from './Svg';

test('support fill prop', () => {
  const t1 = render(
    <Svg title="test1" fill="black">
      <path d="M9.9 20.113V13.8415H14.1V20.113H19.35V11.751H22.5L12 2.34375L1.5 11.751H4.65V20.113H9.9Z" />
    </Svg>
  );
  let element1 = t1.getByTitle('test1');

  expect(element1.getAttribute('size')).toBeNull();
  expect(element1.getAttribute('fill')).toEqual('black');
});
