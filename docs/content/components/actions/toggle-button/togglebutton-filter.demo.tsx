import { venueTraits, venueTypes, venues } from '@/lib/data/venues';
import { MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  Badge,
  Card,
  Headline,
  Inline,
  Stack,
  Text,
  Tiles,
  ToggleButton,
} from '@marigold/components';

export default () => {
  const [selected, setSelected] = useState<Selection>(new Set());

  const filtered =
    selected === 'all' || (selected instanceof Set && selected.size === 0)
      ? venues
      : venues.filter(v =>
          v.traits.some(t => (selected as Set<string>).has(t))
        );

  return (
    <Stack space={4} stretch>
      <Inline>
        <ToggleButton.Group
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}
          size="small"
        >
          {venueTraits.map(trait => (
            <ToggleButton key={trait} id={trait}>
              {trait}
            </ToggleButton>
          ))}
        </ToggleButton.Group>
      </Inline>
      <Text size="sm">
        Showing {filtered.length} of {venues.length} venues
      </Text>
      <Tiles tilesWidth="200px" space={3} stretch>
        {filtered.map(venue => (
          <Card key={venue.id} stretch>
            <Stack space={2}>
              <img
                src={venue.image}
                alt={venue.name}
                className="h-28 w-full rounded-lg object-cover"
              />
              <Stack space={1}>
                <Headline level={4}>{venue.name}</Headline>
                <Inline space={1} alignY="center">
                  <MapPin className="text-secondary-500 size-3.5 shrink-0" />
                  <Text size="xs">{venue.city}</Text>
                </Inline>
              </Stack>
              <Inline space={2}>
                <Badge>{venueTypes[venue.type]}</Badge>
                <Badge>
                  <Inline space={1} alignY="center">
                    <Users className="size-3" />
                    {venue.capacity}
                  </Inline>
                </Badge>
              </Inline>
            </Stack>
          </Card>
        ))}
      </Tiles>
    </Stack>
  );
};
