import React from 'react';
import { render } from '@testing-library/react';

import { Checkbox } from './Checkbox';

test('typings', () => {
  render(
    <Checkbox data-testid="checkbox" indeterminate>
      Hello
    </Checkbox>
  );
});
