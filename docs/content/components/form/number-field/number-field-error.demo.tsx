import { useState } from 'react';
import { NumberField } from '@marigold/components';

export default () => {
  const [charge, setCharge] = useState<number>(9999);
  const errors: string[] = [];

  if (charge > 1000) {
    errors.push('The charge is not allowed to be more than 1.000 €');
  }

  return (
    <NumberField
      label="Charge"
      value={charge}
      formatOptions={{
        style: 'currency',
        currency: 'EUR',
      }}
      minValue={0}
      error={errors.length > 0}
      errorMessage={errors}
      onChange={setCharge}
      hideStepper
    />
  );
};
