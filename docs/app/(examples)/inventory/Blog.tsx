import { people } from '@/lib/data/people';
import {
  Badge,
  Container,
  DateFormat,
  Divider,
  Headline,
  Inline,
  Stack,
  Text,
} from '@marigold/components';

const posts = [
  {
    date: '2025-10-28',
    author: people.find(person => person.id === 'chippy')!,
    tags: ['ui', 'ux'],
    title:
      "Why Your Design System Needs a 'Panic' Button (And Other Bad Ideas)",
    abstract:
      "Let's be real: every designer has wanted to add a giant red 'PANIC' button to their UI library. We'll explore the hilarious side of component constraints, why that 'one-off' design will haunt your dreams, and how a good design system is just a really opinionated bouncer for your app.",
  },
  {
    date: '2025-11-03',
    author: people.find(person => person.id === 'token')!,
    tags: ['tokens', 'css', 'development'],
    title: 'Design Tokens: The Marie Kondo of Your Stylesheet',
    abstract:
      "Does your CSS file spark joy? Or does it look like a digital garage sale? Enter design tokens. We'll show you how these tiny bits of code will tidy up your styles, make your developers weep tears of joy, and finally let you ask, 'Does this hex code *really* belong in my life?'",
  },
  {
    date: '2025-11-10',
    author: people.find(person => person.id === 'sandy')!,
    tags: ['documentation', 'ux writing', 'collaboration'],
    title: "Stop Naming Components Like You're Naming a Pet",
    abstract:
      "If your design system has a 'MegaChonk-Card-v3-final-FINAL', we need to talk. This post is a intervention. We're diving into the art of writing documentation that people *actually* want to read, how to name things so they make sense, and why 'Button-Primary' is a way better name than 'Sir-Reginald-Clicky-IV'.",
  },
] as const;

export const Blog = () => (
  <Stack space={12}>
    <Stack space={1}>
      <Headline level="1">From the blog</Headline>
      <Text variant="muted" weight="light">
        Learn how to grow your business with our expert advice.
      </Text>
    </Stack>
    <Divider />
    <Stack space={20}>
      {posts.map(post => (
        <Stack key={post.title} space={8}>
          <Stack space={2}>
            <Inline space={3} alignY="center">
              <Text variant="muted" fontSize="sm" weight="light">
                <DateFormat value={new Date(post.date)} dateStyle="medium" />
              </Text>
              <Inline space={1}>
                {post.tags.map(tag => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </Inline>
            </Inline>
            <Container contentLength="long" space={2}>
              <Headline level="3">{post.title}</Headline>
              <Text variant="muted" weight="light">
                {post.abstract}
              </Text>
            </Container>
          </Stack>
          <Inline space={6} alignY="center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="size-10 rounded-full"
            />
            <Stack space={1}>
              <Text fontSize="sm">{post.author.name}</Text>
              <Text variant="muted" fontSize="sm" weight="light">
                {post.author.position}
              </Text>
            </Stack>
          </Inline>
        </Stack>
      ))}
    </Stack>
  </Stack>
);
