import { Button, Stack, VisuallyHidden } from '@marigold/components';
import { Delete } from '@marigold/icons';

export default () => (
  <Stack space={5}>
    Start your screenreader and tab to the button to hear how the component can
    support.
    <Button type="button" variant="destructive">
      <Delete aria-hidden="true" />
      <VisuallyHidden>Delete item</VisuallyHidden>
    </Button>
  </Stack>
);
