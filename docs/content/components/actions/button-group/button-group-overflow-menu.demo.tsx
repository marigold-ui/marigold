import { ActionMenu, Button, ButtonGroup, Tooltip } from '@marigold/components';
import { Eye, Pencil } from '@marigold/icons';

export default () => (
  <ButtonGroup aria-label="Event actions" variant="ghost" size="icon">
    <Tooltip.Trigger>
      <Button aria-label="View">
        <Eye />
      </Button>
      <Tooltip>View</Tooltip>
    </Tooltip.Trigger>
    <Tooltip.Trigger>
      <Button aria-label="Edit">
        <Pencil />
      </Button>
      <Tooltip>Edit</Tooltip>
    </Tooltip.Trigger>
    <ActionMenu aria-label="More event actions">
      <ActionMenu.Item id="duplicate">Duplicate</ActionMenu.Item>
      <ActionMenu.Item id="archive">Archive</ActionMenu.Item>
      <ActionMenu.Item id="delete">Delete</ActionMenu.Item>
    </ActionMenu>
  </ButtonGroup>
);
