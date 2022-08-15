import { Box, Container, Headline, Text } from '@marigold/components';

export const TextBlockContainer = () => (
  <Box
    as={Container}
    bg="blue10"
    align="center"
    alignContainer="center"
    p="small"
  >
    <Headline level="2">Star Wars - The Empire Strikes Back</Headline>
    <Box pt="xsmall" width="100%">
      <Text>
        It is a dark time for the Rebellion. Although the Death Star has been
        destroyed, Imperial troops have driven the Rebel forces from their
        hidden base and pursued them across the galaxy. Evading the dreaded
        Imperial Starfleet, a group of freedom fighters led by Luke Skywalker
        has established a new secret base on the remote ice world of Hoth. The
        evil lord Darth Vader, obsessed with finding young Skywalker, has
        dispatched thousands of remote probes into the far reaches of space....
      </Text>
    </Box>
    <Box width="20ch">
      <ul>
        <li>Luke</li>
        <li>Leia</li>
        <li>Han Solo</li>
        <li>Chewbacca</li>
        <li>R2D2</li>
        <li>C3PO</li>
        <li>Darth Vader</li>
      </ul>
    </Box>
  </Box>
);
