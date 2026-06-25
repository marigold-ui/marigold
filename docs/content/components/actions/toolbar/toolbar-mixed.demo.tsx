import { Menu, SearchField, Switch, Toolbar } from '@marigold/components';

export default () => (
  <Toolbar aria-label="Library">
    <SearchField aria-label="Search library" placeholder="Search" width={40} />
    <Switch label="Show archived" />
    <Menu label="Sort">
      <Menu.Item id="name">Name</Menu.Item>
      <Menu.Item id="date">Date modified</Menu.Item>
      <Menu.Item id="size">Size</Menu.Item>
    </Menu>
    <Toolbar.Separator />
    <Toolbar.Action id="import">Import</Toolbar.Action>
    <Toolbar.Action id="export">Export</Toolbar.Action>
  </Toolbar>
);
