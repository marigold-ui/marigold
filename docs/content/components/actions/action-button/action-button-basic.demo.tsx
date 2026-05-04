import { ActionButton, Inline } from '@marigold/components';

export default () => (
  <Inline space={2}>
    <ActionButton>Edit</ActionButton>
    <ActionButton variant="secondary">Save</ActionButton>
    <ActionButton variant="destructive-ghost">Delete</ActionButton>
  </Inline>
);
