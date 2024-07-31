import { boxShadow } from 'tailwindcss/defaultTheme';

import { flattenObject } from './utils';

test.each([
  [
    {
      surface: {
        DEFAULT: boxShadow.none,
        raised: boxShadow.sm,
        overlay: boxShadow.md,
        sunken: boxShadow.none,
      },
    },
    {
      surface: boxShadow.none,
      'surface-raised': boxShadow.sm,
      'surface-overlay': boxShadow.md,
      'surface-sunken': boxShadow.none,
    },
  ],
  [
    {
      component: {
        DEFAULT: '22px',
        sm: '16px',
        lg: '32px',
      },
    },
    { component: '22px', 'component-sm': '16px', 'component-lg': '32px' },
  ],
  [{}, {}],
  [
    {
      person: {
        name: {
          first: 'John',
          last: 'Doe',
        },
        age: 30,
      },
      address: {
        city: 'Example City',
        country: 'Example Country',
      },
    },
    {
      'address-city': 'Example City',
      'address-country': 'Example Country',
      'person-age': 30,
      'person-name-first': 'John',
      'person-name-last': 'Doe',
    },
  ],
])('flatten object', (nestedObject, expected) => {
  expect(flattenObject(nestedObject)).toStrictEqual(expected);
});
