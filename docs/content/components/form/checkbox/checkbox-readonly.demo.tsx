import { Checkbox, Stack } from '@marigold/components';

export default () => (
  <Stack space={6}>
    <Checkbox.Group
      label="Permissions (view mode)"
      readOnly
      defaultValue={['view', 'edit']}
    >
      <Checkbox value="view" label="View events" />
      <Checkbox value="edit" label="Edit events" />
      <Checkbox value="delete" label="Delete events" />
    </Checkbox.Group>
    <Checkbox
      label="Partially granted"
      description="An indeterminate box stays readable too."
      indeterminate
      readOnly
    />
  </Stack>
);
