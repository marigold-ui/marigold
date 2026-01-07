'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Stack,
  Text,
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
          <Checkbox.Group name="eventTypes" label="Select Event Types">
            <Checkbox value="concert" label="Concert" />
            <Checkbox value="festival" label="Festival" />
            <Checkbox value="conference" label="Conference" />
            <Checkbox value="meetup" label="Meetup" />
            <Checkbox value="webinar" label="Webinar" />
          </Checkbox.Group>
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
