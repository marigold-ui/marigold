import type { Venue } from '@/lib/data/venues';
import { venues } from '@/lib/data/venues';
import {
  Inline,
  NumericFormat,
  Select,
  Stack,
  Text,
  TextValue,
} from '@marigold/components';

export default () => (
  <Select
    label="Choose a venue"
    placeholder="Select a venue"
    defaultValue="6"
    width={96}
    items={venues}
    renderValue={([venue]: Venue[]) => (
      <Inline space={2} alignY="center">
        <img
          src={venue.image}
          alt=""
          className="size-5 rounded-sm object-cover"
        />
        <Text>{venue.name}</Text>
      </Inline>
    )}
  >
    {(venue: Venue) => (
      <Select.Option id={venue.id}>
        <Inline space={4} alignY="center" noWrap>
          <img
            src={venue.image}
            alt=""
            className="size-16 rounded-md object-cover"
          />
          <Stack space="tight">
            <TextValue>{venue.name}</TextValue>
            <Text size="xs" variant="muted">
              {venue.city}, {venue.country} · Capacity {venue.capacity} ·{' '}
              {venue.indoor ? 'Indoor' : 'Outdoor'}
            </Text>
            <Inline space={2} alignY="center">
              <Text size="xs" weight="medium">
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
              <Text size="xs" variant="muted">
                ★ {venue.rating.toFixed(1)}
              </Text>
            </Inline>
          </Stack>
        </Inline>
      </Select.Option>
    )}
  </Select>
);
