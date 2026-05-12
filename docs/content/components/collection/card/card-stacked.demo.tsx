import { people } from '@/lib/data/people';
import { Card, Headline, Inline, Stack, Text } from '@marigold/components';

const team = people.slice(0, 4);

export default () => (
  <Stack space="regular">
    {team.map(person => (
      <Card key={person.id} stretch>
        <Card.Body>
          <Inline space="related" alignY="center">
            <img
              src={person.avatar}
              alt=""
              className="size-10 shrink-0 rounded-full object-cover"
            />
            <Stack space="tight">
              <Headline level={4}>{person.name}</Headline>
              <Text variant="muted" size="sm">
                {person.position}
              </Text>
            </Stack>
          </Inline>
        </Card.Body>
      </Card>
    ))}
  </Stack>
);
