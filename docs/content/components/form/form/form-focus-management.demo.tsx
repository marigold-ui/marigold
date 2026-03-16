import { useState } from 'react';
import {
  Button,
  Form,
  Inline,
  Inset,
  SectionMessage,
  Stack,
  TextField,
} from '@marigold/components';

export default () => {
  let [invalid, setInvalid] = useState(false);
  return (
    <Form
      onInvalid={e => {
        e.preventDefault();
        setInvalid(true);
      }}
      onSubmit={e => {
        e.preventDefault();
        setInvalid(false);
      }}
      onReset={() => setInvalid(false)}
    >
      <Inset space={8}>
        <Stack space={4}>
          {invalid ? (
            <SectionMessage variant="error">
              <SectionMessage.Title>Whoopsies!</SectionMessage.Title>
              <SectionMessage.Content>
                Please enter both your email address and password to proceed.
                Ensure that all required fields are filled correctly before
                attempting to log in.
              </SectionMessage.Content>
            </SectionMessage>
          ) : null}
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
        </Stack>
      </Inset>
    </Form>
  );
};
