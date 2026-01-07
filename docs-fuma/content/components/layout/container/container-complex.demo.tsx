'use client';

import { Columns, Container, Headline, Text } from '@marigold/components';

export default () => (
  <Container space={6} align="center" alignItems="center">
    <Headline level="3">Sunny the marigold</Headline>
    <Columns columns={[1, 1]} space={8}>
      <Text>
        In a cozy garden behind an old cottage, a marigold named Sunny grew
        among daisies and tulips. Her petals were vibrant, glowing in deep
        shades of orange and yellow. She loved feeling the warmth of the sun as
        it touched her petals, and she enjoyed the company of her fellow
        flowers. Butterflies would often visit her, and she would sway gently in
        the breeze, feeling a sense of peace. Despite all of this, Sunny
        sometimes felt small compared to the tall sunflowers nearby. They seemed
        grand, while she was just a splash of color in the corner.
      </Text>
      <Text>
        One morning, a little girl named Emma, who lived in the cottage,
        wandered into the garden feeling sad. Her best friend had moved away,
        and she needed comfort. When she saw Sunny's glowing petals, Emma smiled
        for the first time in days. She knelt beside Sunny, touched her petals,
        and whispered, "You're beautiful." Emma made a small bouquet with Sunny
        at the center, finding a bit of joy even in her sadness.
      </Text>
    </Columns>
    <Text>
      After that day, Sunny understood her purpose. It wasn't about being the
      biggest flower, but about bringing light to others. She had made Emma
      smile, and that was more important than anything else. Sunny stood tall,
      proud of her role in the garden—a reminder that even the smallest flowers
      can have the biggest impact.
    </Text>
  </Container>
);
