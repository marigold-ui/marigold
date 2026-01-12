import { useState } from 'react';
import { Button, Inline, Stack, Switch, TextField } from '@marigold/components';

export default function () {
  const [description, setDescription] = useState('');

  const toggleDescription = () => {
    if (description) {
      setDescription('');
    } else {
      setDescription('button is vertically algined with input');
    }
  };

  return (
    <Stack space={6}>
      <Switch label="toggle description" onChange={toggleDescription} />
      <Inline alignY="input" space={6}>
        <div className="flex-1">
          <TextField label="My label is great." description={description} />
        </div>
        <Button onClick={toggleDescription}>Submit</Button>
      </Inline>
    </Stack>
  );
}
