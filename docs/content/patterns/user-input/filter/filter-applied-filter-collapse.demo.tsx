import { Tag } from '@marigold/components';

export default () => (
  <Tag.Group
    label="Applied Filters"
    onRemove={() => {}}
    removeAll
    collapseAt={3}
  >
    <Tag id="type">Type is Club or Lounge</Tag>
    <Tag id="date">Next 7 Days</Tag>
    <Tag id="rating">Min. Rating: 4 ★</Tag>
    <Tag id="capacity">Min Capacity: 100</Tag>
    <Tag id="price">Max. Price: €50</Tag>
  </Tag.Group>
);
