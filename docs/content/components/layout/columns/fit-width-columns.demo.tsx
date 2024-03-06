import { Button, Columns, SearchField } from '@marigold/components';

export default () => (
  <Columns space={2} columns={[8, 'fit']} collapseAt="25em" stretch={false}>
    <SearchField aria-label="searching" placeholder="Type to search" />
    <Button variant="primary" size="small">
      Search
    </Button>
  </Columns>
);
