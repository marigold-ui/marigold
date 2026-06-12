import { DateFormat, Inline, Tag } from '@marigold/components';

// Fixed dates keep the demo deterministic (same output on server and client).
const start = new Date(2026, 7, 3);
const end = new Date(2026, 7, 9);

export default () => (
  <Tag.Group label="Applied Filters" onRemove={() => {}}>
    <Tag id="type">Type is Club or Lounge</Tag>
    <Tag id="date">
      <Inline>
        Next 7 Days (
        <DateFormat value={[start, end]} />)
      </Inline>
    </Tag>
    <Tag id="traits">Traits are cheap, hype (+5 more)</Tag>
  </Tag.Group>
);
