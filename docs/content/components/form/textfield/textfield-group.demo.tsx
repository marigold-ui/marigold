import { useState } from 'react';
import { FieldGroup, Radio, Stack, TextField } from '@marigold/components';

export default () => {
  const [value, setValue] = useState<string>('');
  const error = value.length > 0 && !/^\d+$/.test(value);

  return (
    <FieldGroup labelWidth="100px">
      <Stack space={2}>
        <TextField label="Name" />
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
        <Radio.Group label="Choose">
          <Radio value="1">One</Radio>
          <Radio value="2">Two</Radio>
          <Radio value="3">Three</Radio>
          <Radio value="4">Four</Radio>
        </Radio.Group>
      </Stack>
    </FieldGroup>
  );
};
