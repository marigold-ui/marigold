# Aspect

_Keep media elements at a certain apsect ratio._

The `<Aspect>` component keeps media elements like images or videos in their correct aspect ratio, preventing them from looking stretched or squished on different screens. It is particularly useful for creating responsive layouts where consistent media dimensions are important.

## Usage

When using the `<Aspect>` component to maintain the aspect ratio of media elements, choose an appropriate predefined ratio to ensure a consistent and visually appealing layout. The available aspect ratios include:

- **square**: For media that should have equal width and height.
- **landscape**: Suitable for wider-than-tall elements, commonly used for photos and videos.
- **portrait**: Ideal for media taller than they are wide, like profile pictures.
- **widescreen**: Useful for standard video content with a 16:9 ratio.
- **ultrawide**: Best for extra-wide content, such as panoramic media.
- **golden**: Reflects the golden ratio, providing a balanced and aesthetically pleasing aspect.

Select a ratio based on the type of media and the context in which it is displayed to achieve the best visual effect.

```tsx title="aspect-ratio"
import { Aspect } from '@marigold/components';

export default () => (
  <div className="grid auto-rows-max grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-2 gap-y-4">
    <Aspect ratio="portrait">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
    <Aspect ratio="square">
      <img src="/marigold-abstract.webp" alt="an abstract marigold flower" />
    </Aspect>
    <Aspect ratio="landscape">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
    <Aspect ratio="golden">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
    <Aspect ratio="widescreen">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
    <Aspect ratio="ultrawide">
      <img
        src="/marigold-abstract.webp"
        className="object-cover"
        alt="an abstract marigold flower"
      />
    </Aspect>
  </div>
);
```

### Image

When using the `<Aspect>` component with the `<Image>` component, it's recommended to use the `fit` and `position` of the `<Image>`  component properties to achieve the best results. The `fit` option ensures that the image is properly resized to fill the aspect container without distortion, while the `position` option controls how the image is aligned within the container, allowing for better visual balance.

```tsx title="aspect-image"
import { Aspect, Stack } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <Aspect ratio="ultrawide">
      <img
        src="/marigold-field.webp"
        className="object-cover object-bottom"
        alt="a field of marigold flowers and a bright blue sky"
      />
    </Aspect>
    <Aspect ratio="ultrawide">
      <img
        src="/marigold-field.webp"
        className="object-cover object-top"
        alt="a field of marigold flowers and a bright blue sky"
      />
    </Aspect>
  </Stack>
);
```

### Iframe

When using the `<Aspect>` component with an `<iframe>`, it can help to maintain the aspect ratio of embedded content, such as videos or maps, ensuring they appear correctly across different screen sizes.

To get the best results, combine the aspect component with appropriate `width` and `height` settings on the iframe to avoid any stretching or scaling issues.

```tsx title="aspect-iframe"
import { Aspect } from '@marigold/components';

export default () => (
  <Aspect ratio="landscape">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4820.000043444012!2d7.826018541821473!3d48.020383262446884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47911b1e29425703%3A0xbe342117a976e59!2sEuropa-Park%20Stadion!5e1!3m2!1sde!2sde!4v1647595604899!5m2!1sde!2sde"
      title="Google Maps showing the SC Freiburg stadium"
      width="100%"
      height="100%"
    />
  </Aspect>
);
```

### Max Width

Setting a max width is useful when you want to prevent a media element from growing too large, especially on wider screens. It helps maintain a balanced layout by ensuring the media stays within a reasonable size.

The max width can be controlled using the `maxWidth` prop, allowing you to easily set a limit that fits your layout needs.

```tsx title="aspect-max-width"
import { Aspect } from '@marigold/components';

export default () => (
  <Aspect ratio="square" maxWidth="20vw">
    <img src="/marigold-abstract.webp" alt="an abstract marigold flower" />
  </Aspect>
);
```

## Props

| Prop             | Type                                                                               | Default    | Description                                                                                                                                                                                                                                                                   |
| :--------------- | :--------------------------------------------------------------------------------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby | `string`                                                                           | -          | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                               |
| aria-details     | `string`                                                                           | -          | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                            |
| aria-label       | `string`                                                                           | -          | Defines a string value that labels the current element.                                                                                                                                                                                                                       |
| aria-labelledby  | `string`                                                                           | -          | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                         |
| aria-live        | `"off" \| "polite" \| "assertive"`                                                 | -          | Indicates the level of importance for updates in the live region. - 'off': Updates are not announced unless focused. - 'polite': Updates are announced when the user is idle. - 'assertive': Updates are announced immediately, interrupting other announcements.             |
| children         | `ReactNode`                                                                        | -          | The children of the component.                                                                                                                                                                                                                                                |
| id               | `string`                                                                           | -          | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                        |
| maxWidth         | `string`                                                                           | `100%`     | The maximum width of the image.                                                                                                                                                                                                                                               |
| ratio            | `"square" \| "landscape" \| "portrait" \| "widescreen" \| "ultrawide" \| "golden"` | `"square"` |                                                                                                                                                                                                                                                                               |
| role             | `"region" \| (string & {})`                                                        | -          | Identifies the element a significant section of content for easier navigation. When \`region\` is used as a role, an \`aria-label\` or \`aria-labelledby\` must be provided. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role). |

## Related

- [Building layouts](/foundations/layouts) - Learn how to build layouts.
