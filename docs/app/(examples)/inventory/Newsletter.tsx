'use client';

import {
  Button,
  Columns,
  Container,
  Headline,
  Inline,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

export const Newsletter = () => (
  <Columns columns={[1, 1, 1]} space={12}>
    <Container contentLength="long" space={6}>
      <Stack space={2}>
        <Headline level={2}>Subscribe to our Newsletter</Headline>
        <Text variant="muted" fontSize="lg">
          Get updates, exclusive offers, and expert insights delivered to your
          inbox. Subscribe to our newsletter for the latest news and promotions!
        </Text>
      </Stack>
      <Inline noWrap space={2}>
        <TextField
          arial-label="Email"
          placeholder="Enter your email"
          type="email"
        />
        <Button variant="primary">Subscribe</Button>
      </Inline>
    </Container>
    <Container contentLength="long"></Container>
    <div></div>
  </Columns>
);
