import type { ActionGroupProps } from '@marigold/components';
import { ActionButton, ActionGroup } from '@marigold/components';
import { Edit, Eye, Trash } from '@marigold/icons';

export default (props: ActionGroupProps) => {
  const iconOnly = props.size === 'icon';
  return (
    <ActionGroup {...props} aria-label="Row actions">
      <ActionButton aria-label={iconOnly ? 'View' : undefined}>
        <Eye />
        {!iconOnly && 'View'}
      </ActionButton>
      <ActionButton aria-label={iconOnly ? 'Edit' : undefined}>
        <Edit />
        {!iconOnly && 'Edit'}
      </ActionButton>
      <ActionButton aria-label={iconOnly ? 'Delete' : undefined}>
        <Trash />
        {!iconOnly && 'Delete'}
      </ActionButton>
    </ActionGroup>
  );
};
