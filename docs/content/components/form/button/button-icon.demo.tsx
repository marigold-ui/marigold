import { Button, Stack } from '@marigold/components';
import { Search } from '@marigold/icons';

export default () => (
  <Stack space={5} alignX="left">
    <Button variant="primary">Search</Button>
    <Button variant="primary">
      <Search size={16} /> Search
    </Button>
    <Button variant="icon">
      <Search />
    </Button>
  </Stack>
);
