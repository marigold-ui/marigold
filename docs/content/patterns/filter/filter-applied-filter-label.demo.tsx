import { Tag } from '@marigold/components';

export default () => (
  <Tag.Group label="Applied Filters" onRemove={() => {}}>
    <Tag id="type">Type is Club or Lounge</Tag>
    <Tag id="date">Next 7 Days (TODO!)</Tag>
    <Tag id="traits">Traits are cheap, hype (+5 more)</Tag>
  </Tag.Group>
);
