'use client';

import { useState } from 'react';
import { TextField } from '@marigold/components';

export default () => {
  const [password, setPassword] = useState('');
  const errors = [];

  if (password.length < 8) {
    errors.push('Password must be 8 characters or more.');
  }
  if ((password.match(/[A-Z]/g) ?? []).length < 2) {
    errors.push('Password must include at least 2 upper case letters');
  }
  if ((password.match(/[^a-z]/gi) ?? []).length < 2) {
    errors.push('Password must include at least 2 symbols.');
  }

  return (
    <TextField
      label="Password"
      value={password}
      onChange={setPassword}
      error={errors.length > 0}
      errorMessage={errors}
    />
  );
};
