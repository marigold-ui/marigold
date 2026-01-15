import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Stack,
  Text,
  TextField,
  parseFormData,
} from '@marigold/components';

export default () => {
  const [data, setData] = useState<any>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData(parseFormData(e));
  };

  return (
    <Stack space={8} alignX="left">
      <Form onSubmit={handleSubmit}>
        <Stack space={4} alignX="left">
          <TextField label="Username" name="username" />
          <Checkbox label="Remember me" name="remember" />
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Stack>
      </Form>
      <Stack space={1}>
        <Text weight="medium">Submitted data:</Text>
        <pre className="text-sm">
          <code>{JSON.stringify(data ?? {}, null, 2)}</code>
        </pre>
      </Stack>
    </Stack>
  );
};
