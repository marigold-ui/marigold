import { ActionButton } from '@marigold/components';

export default () => (
  <ActionButton.Group
    aria-label="Cascade precedence"
    size="small"
    variant="ghost"
    disabled
  >
    {/* Group 'small' wins over the local 'large' */}
    <ActionButton size="large">Outsized</ActionButton>
    {/* Local 'destructive' wins over the group 'ghost' */}
    <ActionButton variant="destructive">Delete</ActionButton>
    {/* Local disabled={false} re-enables this button inside a disabled group */}
    <ActionButton disabled={false}>Save</ActionButton>
  </ActionButton.Group>
);
