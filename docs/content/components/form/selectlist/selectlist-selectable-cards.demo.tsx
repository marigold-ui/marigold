import { venueTypes, venues } from '@/lib/data/venues';
import { Badge, Inline, SelectList, Stack, Text } from '@marigold/components';

const featured = venues.slice(0, 3);

export default () => (
  <SelectList
    label="Event space"
    description="Pick the venue to book. You can change it before you confirm."
    variant="bordered"
    orientation="horizontal"
    selectionMode="single"
    defaultSelectedKeys={[featured[0].id]}
  >
    {featured.map(venue => (
      <SelectList.Option
        key={venue.id}
        id={venue.id}
        textValue={`${venue.name}, ${venueTypes[venue.type]}`}
      >
        <div className="col-start-2 row-span-2 w-48 min-w-0">
          <Stack space="regular">
            <img
              src={venue.image}
              alt=""
              className="h-40 w-full max-w-full rounded-sm object-cover"
            />
            <Stack space={1}>
              {/* Reserve two lines so a one-line title (e.g. "Oak Ridge
                  Barn") keeps every horizontal tile the same height, which
                  keeps the photos aligned across the row. */}
              <div className="min-h-14">
                <Text size="lg" weight="semibold">
                  {venue.name}
                </Text>
              </div>
              <Text size="sm" variant="muted">
                {venue.city}, {venue.country}
              </Text>
            </Stack>
            <Stack space="tight">
              <Inline space="related">
                <Badge variant="info">{venueTypes[venue.type]}</Badge>
              </Inline>
              <Text size="sm" variant="muted">
                Up to {venue.capacity.toLocaleString()} guests
              </Text>
            </Stack>
            <Inline space="related" alignY="center">
              <Text size="sm" weight="bold">
                ${venue.price.from.toLocaleString()}
              </Text>
            </Inline>
          </Stack>
        </div>
      </SelectList.Option>
    ))}
  </SelectList>
);
