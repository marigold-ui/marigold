import { Button, SearchField, Select, Toolbar } from '@marigold/components';
import { ListFilter } from '@marigold/icons';

export default () => (
  <Toolbar aria-label="Event filters">
    <SearchField
      aria-label="Search events"
      placeholder="Search events"
      width={64}
    />
    <Select aria-label="Status" placeholder="Status" width={40}>
      <Select.Option id="published">Published</Select.Option>
      <Select.Option id="draft">Draft</Select.Option>
      <Select.Option id="archived">Archived</Select.Option>
    </Select>
    <Toolbar.Separator />
    <Button>
      <ListFilter /> All filters
    </Button>
  </Toolbar>
);
