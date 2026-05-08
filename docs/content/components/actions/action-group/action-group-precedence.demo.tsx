import { ActionButton, ActionGroup } from '@marigold/components';

export default () => (
  <ActionGroup
    aria-label="Cascade precedence"
    size="small"
    variant="ghost"
    disabled
  >
    {/* Group 'small' wins over the local 'large' */}
    <ActionButton size="large">Outsized</ActionButton>
    {/* Local 'destructive-ghost' wins over the group 'ghost' */}
    <ActionButton variant="destructive-ghost">Delete</ActionButton>
    {/* Local disabled={false} re-enables this button inside a disabled group */}
    <ActionButton disabled={false}>Save</ActionButton>
  </ActionGroup>
);
