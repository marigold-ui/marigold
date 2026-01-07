'use client';

import { Button, Form, Inset, Stack, TextField } from '@marigold/components';

export default () => {
  return (
    <Form>
      <Inset space={8}>
        <Stack space={2} alignX="left">
          <TextField label="User Name" name="user" type="name" width="1/2" />
          <TextField
            label="Password"
            name="password"
            type="password"
            width="1/2"
          />
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Stack>
      </Inset>
    </Form>
  );
};
