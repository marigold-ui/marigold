'use client';

import {
  Aspect,
  Breakout,
  Container,
  Headline,
  Inline,
  Text,
} from '@marigold/components';

export default () => (
  <Container space={6} align="center">
    <Headline level="2">Upcoming Shows at The Guffaw Gardens</Headline>
    <Breakout>
      <Inline space={4} alignY="center" alignX="center">
        <Aspect maxWidth="200px">
          <img src="/venues/petal-punchlines.webp" alt="" />
        </Aspect>
        <Aspect maxWidth="200px">
          <img src="/venues/chuckles-and-chill.webp" alt="" />
        </Aspect>
        <Aspect maxWidth="200px">
          <img src="/venues/botanical-banter.webp" alt="" />
        </Aspect>
      </Inline>
    </Breakout>
    <Text>
      Get ready for a season of laughter at The Guffaw Gardens! This spring,
      don't miss the Laugh Bloom Festival, featuring some of the best names in
      comedy.
    </Text>
    <Text>
      On May 5th, The Petal Punchlines will be hosted by comedian Rosie Petals,
      known for her sharp wit. On May 12th, Chuckles & Chill will bring a
      relaxed evening of comedy with Ivy Green and Marv "The Bloom" Thompson.
      Finish the month with Botanical Banter on May 26th, headlined by Daisy
      Bloom and Fern Tickles, promising a night full of laughs.
    </Text>
    <Text>
      Whether with friends or for a special night out, The Guffaw Gardens is the
      place to be for comedy and nature this season.
    </Text>
  </Container>
);
