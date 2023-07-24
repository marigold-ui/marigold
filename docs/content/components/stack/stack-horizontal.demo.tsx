import { Stack, Text } from '@marigold/components';

export default () => (
  <>
    <Stack space={4}>
      <Text>Left</Text>
    </Stack>
    <Stack space={4} alignX="center">
      <Text>Center</Text>
    </Stack>
    <Stack space={4} alignX="right">
      <Text>Right</Text>
    </Stack>
  </>
);
