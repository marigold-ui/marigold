import { Badge, Stack, Text } from '@marigold/components';

export default () => (
  <Stack space="regular">
    <Text>
      Default — sits next to a line of text:{' '}
      <Badge variant="master">Master</Badge>
    </Text>
    <Text>
      Inline — sits inside one:{' '}
      <Badge variant="master" size="inline">
        Master
      </Badge>
    </Text>
  </Stack>
);
