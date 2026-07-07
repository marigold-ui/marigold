import { people } from '@/lib/data/people';
import { Mail, Phone } from 'lucide-react';
import {
  Card,
  Headline,
  Inline,
  LinkButton,
  Stack,
  Text,
  Tiles,
} from '@marigold/components';

export const ContactTiles = () => (
  <Stack space="regular">
    <Headline level={2}>Our Team</Headline>
    <Tiles stretch equalHeight tilesWidth="250px" space="regular">
      {people.map(person => (
        <Card key={person.id} stretch>
          <Card.Content>
            <Stack space="regular" alignX="center">
              <img
                src={person.avatar}
                alt={person.name}
                className="block w-32 rounded-full"
              />
              <Stack alignX="center" space="tight">
                <Text fontSize="xl" weight="semibold">
                  {person.name}
                </Text>
                <Text
                  variant="muted"
                  align="center"
                  fontSize="sm"
                  weight="light"
                >
                  {person.position}
                </Text>
              </Stack>
            </Stack>
          </Card.Content>
          <Card.Footer>
            <Inline alignX="center" space="tight">
              <LinkButton href="#">
                <Mail /> Email
              </LinkButton>
              <LinkButton href="#">
                <Phone /> Phone
              </LinkButton>
            </Inline>
          </Card.Footer>
        </Card>
      ))}
    </Tiles>
  </Stack>
);
