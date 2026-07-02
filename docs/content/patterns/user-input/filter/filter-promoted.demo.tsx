import { Button, Inline, SearchField, Select } from '@marigold/components';
import { ListFilter } from '@marigold/icons';

export default () => (
  <Inline space="related" alignY="input">
    <SearchField
      aria-label="Search events"
      placeholder="Search events"
      width={56}
    />
    <Select aria-label="Status" placeholder="Status" width={36}>
      <Select.Option id="published">Published</Select.Option>
      <Select.Option id="draft">Draft</Select.Option>
      <Select.Option id="archived">Archived</Select.Option>
    </Select>
    <Select aria-label="Category" placeholder="Category" width={36}>
      <Select.Option id="concert">Concerts</Select.Option>
      <Select.Option id="festival">Festivals</Select.Option>
      <Select.Option id="theater">Theater</Select.Option>
    </Select>
    <Button>
      <ListFilter /> All filters
    </Button>
  </Inline>
);
