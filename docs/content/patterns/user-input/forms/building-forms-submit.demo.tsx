import { type FormEvent, useState } from 'react';
import {
  Button,
  Form,
  Panel,
  Stack,
  TextField,
  Title,
  parseFormData,
} from '@marigold/components';

export default () => {
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData(parseFormData(e));
  };

  return (
    <Stack space={4}>
      <Form onSubmit={handleSubmit}>
        <Panel size="form">
          <Panel.Header>
            <Title>Apply promo code</Title>
          </Panel.Header>
          <Panel.Content>
            <TextField label="Promo Code" name="promocode" width={44} />
          </Panel.Content>
          <Panel.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Panel.Footer>
        </Panel>
      </Form>
      {data && (
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}
    </Stack>
  );
};
