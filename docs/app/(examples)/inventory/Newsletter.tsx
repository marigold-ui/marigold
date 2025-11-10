import { CalendarDays, MailCheck } from 'lucide-react';
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
  <Columns columns={[1, 1]} space={32} collapseAt="1000px">
    <Container contentLength="long" space={6}>
      <Stack space={2}>
        <Headline level="2">Subscribe to our Newsletter</Headline>
        <Text variant="muted" fontSize="lg" weight="light">
          Get updates, exclusive offers, and expert insights delivered to your
          inbox. Subscribe to our newsletter for the latest news and promotions!
        </Text>
      </Stack>
      <Inline noWrap space="fieldX">
        <TextField
          arial-label="Email"
          placeholder="Enter your email"
          type="email"
        />
        <Button variant="primary">Subscribe</Button>
      </Inline>
    </Container>
    <Columns columns={[1, 1]} space={8}>
      <Container contentLength="long" space={3}>
        <div className="bg-muted grid size-12 place-items-center rounded-full p-3">
          <CalendarDays className="size-full" strokeWidth={1.5} />
        </div>
        <Headline level="3">Weekly articles</Headline>
        <Text variant="muted" weight="light">
          Every week, get curated articles covering the latest trends, tips, and
          insights.
        </Text>
      </Container>
      <Container contentLength="long" space={3}>
        <div className="bg-muted grid size-12 place-items-center rounded-full p-3">
          <MailCheck className="size-full" strokeWidth={1.5} />
        </div>
        <Headline level="3">No spam</Headline>
        <Text variant="muted" weight="light">
          Enjoy valuable content with no spam, just insights and offers tailored
          for you. Unsubscribe anytime.
        </Text>
      </Container>
    </Columns>
  </Columns>
);
