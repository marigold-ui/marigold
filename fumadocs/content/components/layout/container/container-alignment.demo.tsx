import {
  Aspect,
  Breakout,
  Container,
  Headline,
  Text,
} from '@marigold/components';

export default () => (
  <Container space={4} contentLength="short" align="center" alignItems="center">
    <Headline level="3">Taking care of Marigolds</Headline>
    <Breakout>
      <Aspect maxWidth="350px" ratio="ultrawide">
        <img
          src="/marigold-watering.webp"
          alt="Watering a marigold flower"
          className="object-cover"
        />
      </Aspect>
    </Breakout>
    <Text>
      Caring for marigold flowers is straightforward, making them a popular
      choice for many gardeners. Marigolds thrive best in full sunlight, so make
      sure to plant them in a spot that receives at least six hours of direct
      sunlight every day. They grow well in a variety of soils but prefer
      well-drained, moderately fertile soil. Be sure to space them adequately,
      as proper air circulation helps prevent disease.
    </Text>
    <Text>
      Watering marigolds requires balance. They do best when their soil is kept
      slightly moist but not overly wet. Water the plants deeply when the top
      inch of soil feels dry, but avoid watering directly onto the flowers and
      leaves to prevent mold and mildew. Mulching around the base can help
      retain moisture and minimize weeds.
    </Text>
    <Text>
      Deadheading, or removing spent flowers, will encourage marigolds to bloom
      more vigorously. This not only keeps the plants looking tidy but also
      redirects energy into producing new blooms. With proper sunlight,
      watering, and a bit of pruning, marigold flowers can bring vibrant color
      to your garden all season long.
    </Text>
  </Container>
);
