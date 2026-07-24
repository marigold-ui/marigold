import { Inline, Stack, Text } from '@marigold/components';
import { Search } from '@marigold/icons';

const sizes = [16, 20, 24, 48];

export default () => (
  <Inline space={6} alignY="bottom">
    {sizes.map(size => (
      <Stack key={size} space={2} alignX="center">
        <Search size={size} />
        <Text size="sm">{size}px</Text>
      </Stack>
    ))}
  </Inline>
);
