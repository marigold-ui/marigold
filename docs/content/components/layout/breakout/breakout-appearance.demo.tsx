import {
  Aspect,
  Breakout,
  Container,
  Headline,
  Image,
  Text,
} from '@marigold/components';

export default () => (
  <Container align="center" space={2}>
    <Headline level="2">
      Welcome to The Giggle Grounds - Laughville's New Comedy Hub!
    </Headline>
    <Breakout alignX="right">
      <Aspect ratio="ultrawide">
        <Image src="/venues/the-giggle-grounds.webp" alt="" fit="cover" />
      </Aspect>
    </Breakout>
    <Text>
      Laughville, get ready to laugh! Introducing The Giggle Grounds, an outdoor
      amphitheater for comedy under the stars. Located at 123 Main Street, this
      venue blends natural charm with live entertainment for a perfect night
      out.
    </Text>
    <Text>
      With a capacity of 500, The Giggle Grounds offers an intimate yet lively
      experience, ideal for enjoying top comedians in an open-air setting.
      Pricing ranges from $1000 to $5000, making it flexible for various events
      and budgets.
    </Text>
    <Text>
      Join us at The Giggle Grounds for an unforgettable comedy experience!
    </Text>
    <Text>
      For bookings or more information, visit us at 123 Main Street, Laughville.
    </Text>
  </Container>
);
