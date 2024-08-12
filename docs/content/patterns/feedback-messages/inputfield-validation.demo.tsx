import { useState } from 'react';
import { TextField } from '@marigold/components';

export default () => {
  const [zip, setZip] = useState('791-2');
  const errors = [];

  if (!zip.match('^[0-9]*$')) {
    errors.push('Please enter only numeric (0-9) characters.');
  }

  return (
    <TextField
      label="PLZ"
      value={zip}
      onChange={setZip}
      error={errors.length > 0}
      errorMessage={errors}
    />
  );
};
