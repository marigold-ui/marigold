import { Badge, Button, Stack, Tag } from '@marigold/components';
import { ListFilter } from '@marigold/icons';

export default () => (
  <Stack space={4} alignX="left">
    <Button>
      <ListFilter /> Filter <Badge variant="primary">3</Badge>
    </Button>
    <Tag.Group label="Applied Filters" onRemove={() => {}}>
      <Tag id="type">Type is Club or Lounge</Tag>
      <Tag id="rating">Rating is 3 or more</Tag>
      <Tag id="price">Max. Price is €500</Tag>
    </Tag.Group>
  </Stack>
);
