import { Tag, Text } from '@marigold/components';

export default () => (
  <Tag.Group
    label="Applied Filters"
    emptyState={() => (
      <Text variant="muted" fontSize="sm" fontStyle="italic">
        None
      </Text>
    )}
  >
    {[]}
  </Tag.Group>
);
