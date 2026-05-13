import { ActionButton, ActionGroup, LinkButton } from '@marigold/components';
import { Edit, Trash } from '@marigold/icons';

export default () => (
  <ActionGroup aria-label="Row actions" size="small">
    <LinkButton href="#" aria-label="Edit">
      <Edit />
    </LinkButton>
    <ActionButton
      variant="destructive-ghost"
      aria-label="Delete"
      onPress={() => alert('Delete')}
    >
      <Trash />
    </ActionButton>
  </ActionGroup>
);
