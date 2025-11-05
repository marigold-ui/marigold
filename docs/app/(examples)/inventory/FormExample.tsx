import { Columns, Headline, Stack } from '@marigold/components';

export const FormExample = () => (
  <Stack space={8}>
    <Headline level="1">Form Examples</Headline>
    <Columns columns={[1, 1, 1]} space={8} collapseAt="1000px">
      <Stack></Stack>
      <Stack></Stack>
      <Stack></Stack>
    </Columns>
  </Stack>
);
