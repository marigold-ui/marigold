'use client';

import { NumberField } from '@marigold/components';

export default () => {
  return (
    <NumberField
      label="Quantity"
      error
      errorMessage="Max number of available tickets is 3"
      value={4}
    />
  );
};
