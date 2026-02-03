# Container

_Keep content at an optimal reading width._

The `<Container>` component is designed to limit the width of its content, ensuring an optimal reading experience. By constraining the content width, it helps maintain readability and prevents text from becoming difficult to follow on wide screens.

## Usage

The `<Container>` component is ideal for situations where you need to limit the width of content to ensure better readability and layout consistency. Here are some common use cases where the `<Container>` component is particularly useful:

- **Text-centric pages**: Pages that contain mostly text, such as FAQ pages, user guides, or terms of service, benefit from the `<Container>` component, as it ensures the text is easy to follow and comfortable to read.
- **Hero sections**: Use the `<Container>` for hero banners with headlines and call-to-action buttons. Limiting the width keeps the focus on the main message, avoiding the visual dispersion that comes with overly wide text blocks.
- **Centering content**: The `<Container>` is also useful when you need to center content on the page while ensuring it doesn't stretch too far, providing a consistent and polished appearance.

To limit text length, use the `<Text>` and `<Headline>` components inside the `<Container>`. This will automatically adjust the content length to make it easier to read.

```tsx title="container-appearance"
import { Container, Headline, Text } from '@marigold/components';

export default () => (
  <Container>
    <Headline level="3">The marigold flower</Headline>
    <Text>
      The marigold flower, known for its bright orange and yellow hues, is more
      than just a vibrant addition to gardens. Marigolds have been used for
      centuries in traditional medicine for their anti-inflammatory properties.
      In many cultures, they symbolize positive emotions like warmth and
      creativity, and are often used in festivals and celebrations. The marigold
      is also known for its ability to deter garden pests, making it a favorite
      companion plant for vegetables. Beyond their beauty, these flowers play a
      role in pollinator gardens, attracting bees and butterflies to enhance
      biodiversity.
    </Text>
  </Container>
);
```

### Dynamic width

The width of the `<Container>` is not fixed. It adjusts based on the font size to ensure the optimal reading length, which is determined by the number of characters per line. This results in the `<Container>` varying in size depending on its content.

```tsx title="container-dynamic-width"
import { useState } from 'react';
import { Container, Headline, Select, Stack, Text } from '@marigold/components';

type FontSizes = 'sm' | 'base' | 'lg';

export default () => {
  const [fontSize, setFontSize] = useState<FontSizes>('base');

  return (
    <Stack space={8}>
      <Select
        label="Font size"
        selectedKey={fontSize}
        onChange={(val: FontSizes) => setFontSize(val)}
        width={52}
      >
        <Select.Option id="sm">Small</Select.Option>
        <Select.Option id="base">Default</Select.Option>
        <Select.Option id="lg">Large</Select.Option>
      </Select>

      <Container space={4}>
        <Headline level="3">The Marigold</Headline>
        <Text fontSize={fontSize}>
          Golden petals catch the sun,Blooming bright till day is done.In the
          garden, standing bold,A gentle spark, the marigold.
        </Text>
        <Text fontSize={fontSize}>
          Dew drops fall and sparkle clear,Nature's beauty, always near.Orange
          flames in sunlight hold,Cheerful blooms, the marigold.
        </Text>
      </Container>
    </Stack>
  );
};
```

### Content length

The length of the content within the `<Container>` can be adjusted using the `contentLength` property. This is useful when you want to customize the reading experience based on the type of content.

For example, you might want to shorten the line length for smaller text blocks like quotes or testimonials, while allowing more characters per line for larger bodies of text, such as articles or blog posts. Adjusting `contentLength` helps to maintain readability and improve the overall user experience depending on the context.

```tsx title="container-content-length"
import { Container, Text } from '@marigold/components';

export default () => (
  <Container contentLength="short" space={2}>
    <Text fontSize="2xl">
      "Marigolds are perfect for my garden! They’re easy to care for, bright,
      and keep pests away."
    </Text>
    <Text fontStyle="italic">- Jane S., Home Gardener</Text>
  </Container>
);
```

### Complex layout

The `<Container>` component can be combined with other layout components, such as `<Column>`, to create more complex and cohesive designs. This approach allows you to build immersive layouts while ensuring that text blocks remain readable.

```tsx title="container-complex"
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
```

### Alignment

Using the `align` and `alignItems` prop, the `<Container>` component lets you align text and other elements to the left, center, or right, giving you flexibility in arranging content. This is helpful when you need to make some parts of the layout stand out, like centering a hero section. Good alignment makes the page look organized and improves how users experience the site.

```tsx title="container-alignment"
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
```

## Props

| Prop             | Type                                      | Default     | Description                                                                                                                                                                                                                                                                   |
| :--------------- | :---------------------------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| align            | `"left" \| "center" \| "right"`           | `"left"`    | Set alignment the content inside the container.                                                                                                                                                                                                                               |
| alignItems       | `"left" \| "center" \| "right" \| "none"` | `"none"`    | Set alignment of the items inside the container.                                                                                                                                                                                                                              |
| aria-describedby | `string`                                  | -           | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                               |
| aria-details     | `string`                                  | -           | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                            |
| aria-label       | `string`                                  | -           | Defines a string value that labels the current element.                                                                                                                                                                                                                       |
| aria-labelledby  | `string`                                  | -           | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                         |
| aria-live        | `"off" \| "polite" \| "assertive"`        | -           | Indicates the level of importance for updates in the live region. - 'off': Updates are not announced unless focused. - 'polite': Updates are announced when the user is idle. - 'assertive': Updates are announced immediately, interrupting other announcements.             |
| children         | `ReactNode`                               | -           |                                                                                                                                                                                                                                                                               |
| contentLength    | `"short" \| "default" \| "long"`          | `"default"` | Width of the container.                                                                                                                                                                                                                                                       |
| id               | `string`                                  | -           | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                        |
| role             | `"region" \| (string & {})`               | -           | Identifies the element a significant section of content for easier navigation. When \`region\` is used as a role, an \`aria-label\` or \`aria-labelledby\` must be provided. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role). |
| space            | `GapSpaceProp`                            | `0`         | Set the spacing between child elements.                                                                                                                                                                                                                                       |

## Related

- [Building layouts](../../foundations/layouts) - Learn how to build layouts.
