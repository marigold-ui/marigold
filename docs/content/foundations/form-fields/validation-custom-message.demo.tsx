'use client';

import {
  Button,
  Form,
  Inset,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

export default () => {
  return (
    <Form>
      <Inset space={8}>
        <Stack space={7} alignX="left">
          <Stack>
            <Text fontSize="4xl" weight="extrabold">
              Subscribe to our Newsletter!
            </Text>
            <Text>Stay updated with our latest news and updates.</Text>
          </Stack>

          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            errorMessage={({ validationDetails }) =>
              validationDetails.valueMissing
                ? 'Please enter your email address!'
                : ''
            }
          />
          <Button variant="primary" type="submit">
            Subscribe
          </Button>
        </Stack>
      </Inset>
    </Form>
  );
};
