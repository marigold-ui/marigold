'use client';

import { TextField } from '@marigold/components';

export default () => {
  return (
    <TextField
      label="Promo Code"
      description="You can find the code on the back of your ticket."
      errorMessage="The promo code was already used."
    />
  );
};
