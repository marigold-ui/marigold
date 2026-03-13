import { useState } from 'react';
import { TextField } from '@marigold/components';

export default () => {
  const [zipCode, setZipCpode] = useState<string>('7911');
  return (
    <TextField
      label="Zip code"
      pattern="[0-9]{5}"
      value={zipCode}
      description="Enter your 5 digit zip code."
      errorMessage="Your zip code hasn't 5 digits. Update it and try again."
      onChange={setZipCpode}
    />
  );
};
