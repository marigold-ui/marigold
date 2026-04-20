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
  <Stack space={6}>
    <Headline level="2">Our Team</Headline>
    <Tiles stretch equalHeight tilesWidth="250px" space={4}>
      {people.map(person => (
        <Card key={person.id} pt={8} pb={6} px={0} stretch>
          <Stack space={12} alignY="between" stretch>
            <Stack space={8} alignX="center">
              <img
                src={person.avatar}
                alt={person.name}
                className="block w-32 rounded-full"
              />
              <Stack alignX="center" space={1}>
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
            <Inline alignX="center" space={1}>
              <LinkButton href="#">
                <Mail /> Email
              </LinkButton>
              <LinkButton href="#">
                <Phone /> Phone
              </LinkButton>
            </Inline>
          </Stack>
        </Card>
      ))}
    </Tiles>
  </Stack>
);
