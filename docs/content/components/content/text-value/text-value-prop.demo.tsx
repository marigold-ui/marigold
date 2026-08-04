import type { Venue } from '@/lib/data/venues';
import { venueTypes, venues } from '@/lib/data/venues';
import {
  Badge,
  Inline,
  Inset,
  NumericFormat,
  Select,
  Stack,
  Text,
} from '@marigold/components';

export default () => (
  <Select
    label="Choose a venue"
    placeholder="Browse venues"
    defaultValue="6"
    width="full"
    items={venues}
    renderValue={([venue]: Venue[]) => (
      <Inline space={2} alignY="center" noWrap>
        <img
          src={venue.image}
          alt=""
          className="size-5 rounded-sm object-cover"
        />
        <Inline space={1} alignY="center" noWrap>
          <Text>{venue.name}</Text>
          <Text variant="muted">
            ({venue.city}, {venue.country})
          </Text>
        </Inline>
      </Inline>
    )}
  >
    {(venue: Venue) => (
      <Select.Option id={venue.id} textValue={venue.name}>
        <Inset p="square-regular">
          <Inline space={4} alignY="top" noWrap>
            <img
              src={venue.image}
              alt=""
              className="aspect-video w-40 shrink-0 rounded-md object-cover"
            />

            <Stack space={2}>
              <Stack space={1}>
                <Inline space={2} alignY="center">
                  <Badge variant="info">{venueTypes[venue.type]}</Badge>
                  <Text size="xs" variant="muted">
                    {venue.city}, {venue.country}
                  </Text>
                </Inline>
                <Text size="xl" weight="bold" lineHeight="tight">
                  {venue.name}
                </Text>
              </Stack>

              <Text size="sm" variant="muted">
                {venue.description}
              </Text>

              <Inline space={3} alignY="center" alignX="between">
                <Inline space={3} alignY="center">
                  <Text size="xs" variant="muted">
                    Capacity {venue.capacity}
                  </Text>
                  <Text size="xs" variant="muted">
                    {venue.indoor ? 'Indoor' : 'Outdoor'}
                  </Text>
                  <Text size="xs" variant="muted">
                    ★ {venue.rating.toFixed(1)}
                  </Text>
                </Inline>
                <Text size="sm" weight="semibold">
                  <NumericFormat
                    style="currency"
                    currency="USD"
                    value={venue.price.from}
                    maximumFractionDigits={0}
                  />
                  {' – '}
                  <NumericFormat
                    style="currency"
                    currency="USD"
                    value={venue.price.to}
                    maximumFractionDigits={0}
                  />
                </Text>
              </Inline>
            </Stack>
          </Inline>
        </Inset>
      </Select.Option>
    )}
  </Select>
);
