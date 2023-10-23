import { Headline, Stack, Text } from '@marigold/components';

export default () => (
  <Stack space={8}>
    <Stack space={4}>
      <Headline level={2}>Stack Content #1</Headline>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text>
        Phasellus ipsum tortor, aliquet dapibus fermentum in, mollis vel metus.
      </Text>
    </Stack>
    <Stack space={4}>
      <Headline level={2}>Stack Content #2</Headline>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text>
        Phasellus ipsum tortor, aliquet dapibus fermentum in, mollis vel metus.
      </Text>
    </Stack>
  </Stack>
);
