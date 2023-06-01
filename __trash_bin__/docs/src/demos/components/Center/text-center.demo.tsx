import { Button, Center, Headline, Stack, Text } from '@marigold/components';

export const TextCenter = () => (
  <Stack space="medium">
    <Headline level="2">Star Wars - The Empire Strikes Back</Headline>
    <Text>
      It is a dark time for the Rebellion. Although the Death Star has been
      destroyed, Imperial troops have driven the Rebel forces from their hidden
      base and pursued them across the galaxy.
    </Text>
    <Center>
      <Button variant="secondary">Watch now</Button>
    </Center>
    <Text>
      Evading the dreaded Imperial Starfleet, a group of freedom fighters led by
      Luke Skywalker has established a new secret base on the remote ice world
      of Hoth. The evil lord Darth Vader, obsessed with finding young Skywalker,
      has dispatched thousands of remote probes into the far reaches of
      space....
    </Text>
  </Stack>
);
