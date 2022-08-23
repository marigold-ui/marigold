import { Stack, Text } from '@marigold/components';

export const HorizontalStack = () => (
  <>
    <Stack space="medium">
      <Text>Left</Text>
    </Stack>
    <Stack space="medium" alignX="center">
      <Text>Center</Text>
    </Stack>
    <Stack space="medium" alignX="right">
      <Text>Right</Text>
    </Stack>
  </>
);
