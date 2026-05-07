import {
  Badge,
  Button,
  Card,
  Headline,
  Inline,
  Stack,
  Text,
  Tiles,
} from '@marigold/components';

const items = [
  {
    id: 'invoices',
    variant: 'default' as const,
    title: 'Invoice export',
    badge: { text: 'General', variant: 'info' as const },
    body: 'Download monthly invoices for your billing records.',
    cta: 'Download',
  },
  {
    id: 'fee-rules',
    variant: 'admin' as const,
    title: 'Fee rules',
    badge: { text: 'Admin', variant: 'info' as const },
    body: 'Configure platform-wide service fees and rounding behavior.',
    cta: 'Open rules',
  },
  {
    id: 'feature-flags',
    variant: 'master' as const,
    title: 'Feature flags',
    badge: { text: 'Master', variant: 'info' as const },
    body: 'Toggle experimental features for selected accounts.',
    cta: 'Manage flags',
  },
];

export default () => (
  <div className="bg-bg-surface rounded-xl p-6">
    <Tiles space={4} tilesWidth="240px" stretch>
      {items.map(item => (
        <Card key={item.id} variant={item.variant}>
          <Card.Header>
            <Stack space={1}>
              <Headline level={3}>{item.title}</Headline>
              <Inline space={2}>
                <Badge variant={item.badge.variant}>{item.badge.text}</Badge>
              </Inline>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Text variant="muted">{item.body}</Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="ghost" size="small">
              {item.cta}
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </Tiles>
  </div>
);
