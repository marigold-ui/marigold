import { Headline, Stack, Text } from '@marigold/components';

export default () => {
  return (
    <Stack space={4}>
      <Stack space={1}>
        <Headline level="2">Shipping Information</Headline>
        <Text>Please fill out the details for shipping.</Text>
      </Stack>
    </Stack>
  );
};
