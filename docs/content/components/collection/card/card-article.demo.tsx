import {
  Badge,
  Card,
  Headline,
  Inline,
  Link,
  Stack,
  Text,
  Tiles,
} from '@marigold/components';

const articles = [
  {
    id: 'tickets-2025',
    image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
    category: 'Sales',
    title: 'How dynamic pricing reshaped our 2025 ticketing season',
    excerpt:
      'A look at the levers that moved the needle for venue owners — and the ones that didn’t.',
    author: 'Sandy Vega',
    readTime: '6 min read',
  },
  {
    id: 'audit-trail',
    image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg',
    category: 'Product',
    title: 'Designing an audit trail people actually want to read',
    excerpt:
      'How we redesigned event change history to surface intent without burying details.',
    author: 'Alex Chen',
    readTime: '4 min read',
  },
  {
    id: 'forms',
    image: 'https://images.pexels.com/photos/3194519/pexels-photo-3194519.jpeg',
    category: 'Engineering',
    title: 'Cutting form complexity by half without losing flexibility',
    excerpt:
      'The patterns we landed on after rebuilding the registration flow from scratch.',
    author: 'Hannah White',
    readTime: '5 min read',
  },
];

export default () => (
  <div className="bg-bg-surface rounded-xl p-6">
    <Tiles space={4} tilesWidth="280px" stretch>
      {articles.map(article => (
        <Card key={article.id}>
          <Card.Preview>
            <img
              src={article.image}
              alt=""
              className="h-44 w-full object-cover"
            />
          </Card.Preview>
          <Card.Header>
            <Stack space={2}>
              <Inline space={2}>
                <Badge variant="info">{article.category}</Badge>
              </Inline>
              <Headline level={3}>{article.title}</Headline>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Text variant="muted">{article.excerpt}</Text>
          </Card.Body>
          <Card.Footer>
            <Inline space={2} alignY="center">
              <Text size="sm" weight="bold">
                {article.author}
              </Text>
              <Text size="sm" variant="muted">
                {article.readTime}
              </Text>
              <Link href="#!" size="small">
                Read
              </Link>
            </Inline>
          </Card.Footer>
        </Card>
      ))}
    </Tiles>
  </div>
);
