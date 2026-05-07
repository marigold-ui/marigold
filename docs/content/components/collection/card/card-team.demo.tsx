import { people } from '@/lib/data/people';
import {
  Card,
  Headline,
  Inline,
  Link,
  Stack,
  Text,
  Tiles,
} from '@marigold/components';

const team = people.slice(0, 6);

export default () => (
  <div className="bg-bg-surface rounded-xl p-6">
    <Tiles space={4} tilesWidth="220px" stretch>
      {team.map(person => (
        <Card key={person.id}>
          <Card.Header>
            <Inline space={3} alignY="center">
              <img
                src={person.avatar}
                alt=""
                className="size-12 rounded-full object-cover"
              />
              <Stack space={1}>
                <Headline level={4}>{person.name}</Headline>
                <Text variant="muted" size="sm">
                  {person.position}
                </Text>
              </Stack>
            </Inline>
          </Card.Header>
          <Card.Footer>
            <Link href={`mailto:${person.email}`} size="small">
              {person.email}
            </Link>
          </Card.Footer>
        </Card>
      ))}
    </Tiles>
  </div>
);
