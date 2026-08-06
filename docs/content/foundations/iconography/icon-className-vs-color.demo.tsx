import { Inline, Stack, Text } from '@marigold/components';
import { TriangleAlert } from '@marigold/icons';

export default () => (
  <Stack space={4}>
    <Inline space={2} alignY="center">
      <TriangleAlert color="var(--color-destructive-accent)" />
      <Text>Using the color prop</Text>
    </Inline>
    <Text color="destructive-accent">
      <Inline space={2} alignY="center">
        <TriangleAlert />
        Inherits currentColor from the parent
      </Inline>
    </Text>
    <Inline space={2} alignY="center">
      <TriangleAlert className="text-destructive-accent" />
      <Text>className applied directly to the icon</Text>
    </Inline>
  </Stack>
);
