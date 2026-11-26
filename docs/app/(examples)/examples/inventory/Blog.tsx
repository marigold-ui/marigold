import { people } from '@/lib/data/people';
import {
  Badge,
  Container,
  DateFormat,
  Headline,
  Inline,
  Panel,
  Stack,
  Text,
} from '@marigold/components';

const posts = [
  {
    date: '2025-10-28',
    author: people.find(person => person.id === 'headliner')!,
    tags: ['programming', 'booking'],
    title: 'Why Every Line-up Needs an Opener Nobody Has Heard Of (Yet)',
    abstract:
      "Every booker dreams of the headliner. We'll make the case for the act on at seven: why openers fill the bar, sell next year's tickets, and why the band nobody knew in 2019 is the one now selling out your biggest room.",
  },
  {
    date: '2025-11-03',
    author: people.find(person => person.id === 'encore')!,
    tags: ['artists', 'hospitality', 'riders'],
    title:
      'The Rider Is a Love Letter: Reading Between the Bowls of Green M&Ms',
    abstract:
      "Does a rider spark joy? Or does it read like a hostage note? We'll show you what the odd requests are really asking for, which ones to argue about, and why a warm dressing room and a cold drink get you an encore more often than any fee.",
  },
  {
    date: '2025-11-10',
    author: people.find(person => person.id === 'soundcheck')!,
    tags: ['venues', 'operations', 'show day'],
    title: "Stop Naming Your Rooms Like You're Naming a Pet",
    abstract:
      "If your venue has a 'Big Room', a 'Bigger Room' and a 'New Big Room (old bar)', we need to talk. This post is an intervention. We're diving into how to name and describe spaces so crews, artists and guests all end up at the right door, and why 'Hall A, ground floor' beats 'the one past the fire exit'.",
  },
] as const;

export const Blog = () => (
  <Stack space="regular">
    <Stack space="related">
      <Headline level={2}>From the blog</Headline>
      <Text>Learn how to grow your business with our expert advice.</Text>
    </Stack>
    <Panel aria-label="From the blog">
      <Panel.Content>
        <Stack space="section">
          {posts.map(post => (
            <Stack key={post.title} space="regular">
              <Stack space="related">
                <Inline space="related" alignY="center">
                  <Text variant="muted" fontSize="sm" weight="light">
                    <DateFormat
                      value={new Date(post.date)}
                      dateStyle="medium"
                    />
                  </Text>
                  <Inline space="tight">
                    {post.tags.map(tag => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </Inline>
                </Inline>
                <Container contentLength="long" space="related">
                  <Headline level="3">{post.title}</Headline>
                  <Text variant="muted" weight="light">
                    {post.abstract}
                  </Text>
                </Container>
              </Stack>
              <Inline space="regular" alignY="center">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="size-10 rounded-full"
                />
                <Stack space="tight">
                  <Text fontSize="sm">{post.author.name}</Text>
                  <Text variant="muted" fontSize="sm" weight="light">
                    {post.author.position}
                  </Text>
                </Stack>
              </Inline>
            </Stack>
          ))}
        </Stack>
      </Panel.Content>
    </Panel>
  </Stack>
);
