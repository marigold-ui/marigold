import { TextField } from '@marigold/components';
import { useState } from 'react';

export const FieldTextErrorNumberImput = () => {
  const [value, setValue] = useState<string>('');
  const error = value.length > 0 && !/^\d+$/.test(value);

  return (
    <TextField
      label="Promo Code"
      description="You'll find your promo code on the back of your ticket."
      errorMessage="Your promo code is not valid! Please review your input."
      value={value}
      onChange={setValue}
      error={error}
      inputMode="numeric"
      pattern="[0-9]*"
    />
  );
};
