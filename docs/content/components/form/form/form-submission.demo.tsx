import { useState } from 'react';
import {
  Button,
  Form,
  Inline,
  Inset,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

export default () => {
  let [action, setAction] = useState<string | null>(null);
  return (
    <Form
      onSubmit={e => {
        // This will prevent the native form submission
        e.preventDefault();

        // Read the form values and convert it to a regular object
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setAction(`data: ${JSON.stringify(data, null, 2)}`);
      }}
      onReset={() => setAction('reset')}
    >
      <Inset space={8}>
        <Stack space={4}>
          <Stack space={2} alignX="left">
            <TextField
              label="User Name"
              name="user"
              type="name"
              width="1/2"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              width="1/2"
              required
            />
            <Inline space={2}>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Button type="reset">Reset</Button>
            </Inline>
          </Stack>
          {action && (
            <div className="bg-secondary-200 rounded-lg p-4">
              <Text weight="bold">Action:</Text>
              <pre>
                <code>{action}</code>
              </pre>
            </div>
          )}
        </Stack>
      </Inset>
    </Form>
  );
};
