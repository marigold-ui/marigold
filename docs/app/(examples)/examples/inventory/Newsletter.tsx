import { CalendarDays, MailCheck } from 'lucide-react';
import {
  Button,
  Columns,
  Container,
  Description,
  Headline,
  Inline,
  Panel,
  Stack,
  Text,
  TextField,
  Title,
} from '@marigold/components';

export const Newsletter = () => (
  <Panel>
    <Panel.Header>
      <Title>Subscribe to our Newsletter</Title>
      <Description>
        Get updates, exclusive offers, and expert insights delivered to your
        inbox. Subscribe to our newsletter for the latest news and promotions!
      </Description>
    </Panel.Header>
    <Panel.Content>
      <Columns columns={[1, 1]} space="section" collapseAt="1000px">
        <Stack space="regular">
          <Inline noWrap space="related">
            <TextField
              arial-label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <Button variant="primary">Subscribe</Button>
          </Inline>
        </Stack>
        <Columns columns={[1, 1]} space="regular">
          <Container contentLength="long" space="related">
            <div className="bg-muted grid size-12 place-items-center rounded-full p-3">
              <CalendarDays className="size-full" strokeWidth={1.5} />
            </div>
            <Headline level="3">Weekly articles</Headline>
            <Text variant="muted" weight="light">
              Every week, get curated articles covering the latest trends, tips,
              and insights.
            </Text>
          </Container>
          <Container contentLength="long" space="related">
            <div className="bg-muted grid size-12 place-items-center rounded-full p-3">
              <MailCheck className="size-full" strokeWidth={1.5} />
            </div>
            <Headline level="3">No spam</Headline>
            <Text variant="muted" weight="light">
              Enjoy valuable content with no spam, just insights and offers
              tailored for you. Unsubscribe anytime.
            </Text>
          </Container>
        </Columns>
      </Columns>
    </Panel.Content>
  </Panel>
);
