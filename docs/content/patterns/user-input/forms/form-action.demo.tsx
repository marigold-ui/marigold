import { Button, Inline, Stack, Text } from '@marigold/components';

export default () => (
  <Stack space="group">
    <Stack space="tight">
      <Text weight="bold">Primary action and cancel</Text>
      <Inline space="related" alignY="center">
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Cancel</Button>
      </Inline>
    </Stack>
    <Stack space="tight">
      <Text weight="bold">With additional alternative completion</Text>
      <Inline space="related" alignY="center">
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Save as Draft</Button>
        <Button variant="ghost">Cancel</Button>
      </Inline>
    </Stack>
  </Stack>
);
