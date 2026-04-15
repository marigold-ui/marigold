import { venueTypes, venues } from '@/lib/data/venues';
import { Heart, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import {
  Badge,
  Card,
  Headline,
  Inline,
  Stack,
  Text,
  ToggleButton,
} from '@marigold/components';

export default () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  return (
    <Stack space={3}>
      {venues.slice(0, 3).map(venue => (
        <Card key={venue.id} stretch>
          <div className="flex gap-4">
            <img
              src={venue.image}
              alt={venue.name}
              className="size-28 shrink-0 rounded-lg object-cover"
            />
            <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
              <Inline alignX="between" alignY="top" space={3}>
                <Stack space={0.5}>
                  <Headline level={4}>{venue.name}</Headline>
                  <Inline space={1} alignY="center">
                    <MapPin className="text-secondary-500 size-3.5" />
                    <Text size="xs">
                      {venue.city}, {venue.country}
                    </Text>
                  </Inline>
                </Stack>
                <ToggleButton
                  size="icon"
                  selected={favorites.has(venue.id)}
                  onChange={() => toggle(venue.id)}
                  aria-label={
                    favorites.has(venue.id)
                      ? `Remove ${venue.name} from favorites`
                      : `Add ${venue.name} to favorites`
                  }
                >
                  <Heart
                    fill={favorites.has(venue.id) ? 'currentColor' : 'none'}
                  />
                </ToggleButton>
              </Inline>
              <Inline space={2}>
                <Badge>{venueTypes[venue.type]}</Badge>
                <Badge>
                  <Inline space={1} alignY="center">
                    <Users className="size-3" />
                    {venue.capacity}
                  </Inline>
                </Badge>
              </Inline>
            </div>
          </div>
        </Card>
      ))}
    </Stack>
  );
};
