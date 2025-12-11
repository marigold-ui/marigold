import { venues } from '@/lib/data/venues';
import { Card, Columns, Link, Stack, Text } from '@marigold/components';

const VenueCard = ({ id }: { id: (typeof venues)[number]['id'] }) => {
  const venue = venues.find(venue => venue.id === id)!;

  return (
    <Card p={0} stretch>
      <div className="grid overflow-hidden rounded-[calc(var(--radius-surface)-3px)]">
        <img
          className="col-start-1 row-start-1 aspect-square w-full object-cover"
          src={venue.image}
          alt={venue.name}
        />
        <div className="p-squish-compact relative col-start-1 row-start-1 mx-2 mb-2 self-end rounded-lg bg-white/75 shadow-lg inset-shadow-xs inset-shadow-white/75">
          <div className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-br from-white/60 to-transparent"></div>
          <div className="relative z-10">
            <Stack space="related">
              <Text weight="semibold">{venue.name}</Text>
              <div className="line-clamp-2 text-sm">{venue.description}</div>
              <Link variant="secondary" size="small">
                Learn more
              </Link>
            </Stack>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default () => {
  return (
    <Columns columns={[1, 1, 1]} space="related">
      <VenueCard id="18" />
      <VenueCard id="17" />
      <VenueCard id="3" />
    </Columns>
  );
};
