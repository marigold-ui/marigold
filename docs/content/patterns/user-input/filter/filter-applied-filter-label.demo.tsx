import { DateFormat, Tag } from '@marigold/components';

// Fixed dates and per-date formatting keep the demo deterministic. A range
// (formatRange) hydrates differently because its separator characters vary
// between the server's and the browser's ICU version.
const start = new Date(2026, 7, 3);
const end = new Date(2026, 7, 9);

export default () => (
  <Tag.Group label="Applied Filters" onRemove={() => {}}>
    <Tag id="type">Type is Club or Lounge</Tag>
    <Tag id="date">
      <span>
        Last 7 days (<DateFormat value={start} month="short" day="numeric" /> to{' '}
        <DateFormat value={end} month="short" day="numeric" />)
      </span>
    </Tag>
    <Tag id="traits">Traits are cheap, hype (+5 more)</Tag>
  </Tag.Group>
);
