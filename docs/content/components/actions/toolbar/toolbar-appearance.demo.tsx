import type { ToolbarProps } from '@marigold/components';
import { Button, SearchField, Toolbar } from '@marigold/components';

export default (props: ToolbarProps) => (
  <Toolbar {...props} aria-label="Filters">
    <SearchField aria-label="Search" placeholder="Search" width={48} />
    <Toolbar.Separator />
    <Button>All filters</Button>
  </Toolbar>
);
