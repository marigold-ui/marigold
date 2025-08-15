import { Tag } from '@marigold/components';

export default () => (
  <Tag.Group label="Applied Filters" onRemove={() => {}} removeAll>
    <Tag id="type">Type is Club or Lounge</Tag>
    <Tag id="traits">Traits are cheap, hype (+5 more)</Tag>
  </Tag.Group>
);
