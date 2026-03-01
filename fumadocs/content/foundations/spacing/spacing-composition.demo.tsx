import { venues } from '@/lib/data/venues';
import {
  Card,
  Headline,
  Inset,
  Link,
  Stack,
  Tiles,
} from '@marigold/components';

const VenueCard = ({ id }: { id: (typeof venues)[number]['id'] }) => {
  const venue = venues.find(venue => venue.id === id)!;

  return (
    <Card p={0} stretch>
      <div className="grid overflow-hidden rounded-[calc(var(--radius-surface)-3px)]">
        <img
          className="col-start-1 row-start-1 aspect-square w-full scale-150 object-cover"
          src={venue.image}
          alt={venue.name}
        />
        <div className="relative col-start-1 row-start-1 mx-2 mb-2 self-end rounded-lg bg-white/40 shadow-lg inset-shadow-xs inset-shadow-white/75 backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-br from-white/90 to-transparent"></div>
          <div className="relative z-10">
            <Inset space={2}>
              <Stack space="related">
                <Headline level="3" lineHeight="none">
                  {venue.name}
                </Headline>
                <div className="line-clamp-2 text-sm">{venue.description}</div>
                <Link href="#" variant="secondary" size="small">
                  Learn more
                </Link>
              </Stack>
            </Inset>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default () => {
  return (
    <Tiles space="related" stretch>
      <VenueCard id="10" />
      <VenueCard id="6" />
      <VenueCard id="4" />
      <VenueCard id="8" />
    </Tiles>
  );
};
