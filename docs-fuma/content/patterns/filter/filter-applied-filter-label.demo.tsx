import { DateFormat, Inline, Tag } from '@marigold/components';

export default () => (
  <Tag.Group label="Applied Filters" onRemove={() => {}}>
    <Tag id="type">Type is Club or Lounge</Tag>
    <Tag id="date">
      <Inline>
        Next 7 Days (
        <DateFormat
          value={[new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]}
        />
        )
      </Inline>
    </Tag>
    <Tag id="traits">Traits are cheap, hype (+5 more)</Tag>
  </Tag.Group>
);
