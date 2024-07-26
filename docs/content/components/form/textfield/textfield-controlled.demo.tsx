import { useState } from 'react';

import { Inline, Label, Text, TextField } from '@marigold/components';

export default () => {
  const [value, setValue] = useState('I am under control');
  return (
    <Inline space={4}>
      <div>
        <TextField
          label="Controlled"
          value={value}
          onChange={val => setValue(val)}
        />
        <Inline space={2}>
          <Label>Controlled value:</Label>
          <Text>{value}</Text>
        </Inline>
      </div>
      <TextField label="Uncontrolled" defaultValue="Uncontrolled" />
    </Inline>
  );
};
