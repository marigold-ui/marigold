import { venueTypes, venues } from '@/lib/data/venues';
import { Badge, Headline, Stack, Text, Tiles } from '@marigold/components';

const VenueCard = ({ id }: { id: (typeof venues)[number]['id'] }) => {
  const venue = venues.find(venue => venue.id === id)!;

  return (
    <Stack space="related">
      <div className="grid grid-cols-1 grid-rows-1">
        <img
          className="col-start-1 row-start-1 aspect-video w-full rounded-lg object-cover"
          src={venue.image}
          alt={venue.name}
        />
        <div className="col-start-1 row-start-1 pt-0.5 pl-1">
          <Badge variant="primary">{venueTypes[venue.type]}</Badge>
        </div>
      </div>
      <Text variant="muted" fontSize="xs">
        {venue.city}, {venue.country}
      </Text>
      <Headline level="3" lineHeight="none">
        {venue.name}
      </Headline>
      <div className="line-clamp-2 text-sm">{venue.description}</div>
    </Stack>
  );
};

export default () => {
  return (
    <Tiles space="group" stretch>
      <VenueCard id="12" />
      <VenueCard id="14" />
      <VenueCard id="21" />
      <VenueCard id="1" />
    </Tiles>
  );
};
