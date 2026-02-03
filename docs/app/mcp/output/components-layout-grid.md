# Grid

_Arrage elements in a grid structure._

The `<Grid>` component is a versatile tool to arrange child elements within a two-dimensional grid structure ([CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)).

## Usage

`<Grid>` allows full control over columns and rows sizes, spacing between children, and the overall height. It is highly customizable, so that the `<Grid>` can be used optimally for complex layouts.

One of the benefits of using `<Grid>` is that its associated component, `<Grid.Area>`, don't need to be arranged in any specific order. They will be automatically positioned based on their `name` prop. If you'd like to understand more about how grid template areas function, you can find a detailed article [here](https://www.smashingmagazine.com/understanding-css-grid-template-areas/).

### Holy Grail

Below you find an example demonstrating how to create the [holy grail layout](<https://en.wikipedia.org/wiki/Holy_grail_(web_design)>) using the `<Grid>` component below. It is usefull if you need easy vertical and horizontal alignment of content while staying responsive.

```tsx title="grid-holy-grail"
import { Grid } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Grid
    areas={['header header', 'sidebar main', 'footer footer']}
    columns={[1, 4]}
    rows={['80px', 'auto', '80px']}
    height={80}
    space={1}
  >
    <Grid.Area name="header">
      <Rectangle height="100%">
        <div className="text-text-primary-muted m-auto">Header</div>
      </Rectangle>
    </Grid.Area>
    <Grid.Area name="sidebar">
      <Rectangle height="100%">
        <div className="text-text-primary-muted m-auto">Sidebar</div>
      </Rectangle>
    </Grid.Area>
    <Grid.Area name="main">
      <Rectangle height="100%">
        <div className="text-text-primary-muted m-auto">Main</div>
      </Rectangle>
    </Grid.Area>
    <Grid.Area name="footer">
      <Rectangle height="100%">
        <div className="text-text-primary-muted m-auto">Footer</div>
      </Rectangle>
    </Grid.Area>
  </Grid>
);
```

### Bento

The `<Grid>` component can also be used to create [bento layouts](https://bootcamp.uxdesign.cc/web-design-trend-bento-box-95814d99ac62). Here is an examples for a more complex grid, where every element has its own dimensions.

```tsx title="grid-bento"
import { Grid } from '@marigold/components';
import { cn } from '@marigold/system';

const Teaser = ({
  className,
  src,
  alt,
}: {
  className?: string;
  src: string;
  alt: string;
}) => (
  <img
    className={cn(
      'size-full rounded-2xl object-cover object-center drop-shadow-lg',
      className
    )}
    alt={alt}
    src={src}
  />
);

export default () => (
  <Grid
    areas={[
      'event-1 event-1 mobile-ticket',
      'logo logo mobile-ticket',
      'logo logo tickets',
      'social-media event-2 tickets',
    ]}
    columns={[3, 2, 3]}
    rows={['160px', '60px', '40px', '100px']}
    space={4}
  >
    <Grid.Area name="event-1">
      <Teaser
        alt="crowd surfing"
        src="https://www.reservix.net/app/uploads/2023/08/shutterstock_2134745259.jpg"
      />
    </Grid.Area>
    <Grid.Area name="mobile-ticket">
      <Teaser
        alt="mobile ticket"
        src="https://www.reservix.net/app/uploads/resized/2023/12/Zusammenarbeit-RX-Mobilticket-1000x667-231201-1000x750-c-center.jpg"
      />
    </Grid.Area>
    <Grid.Area name="logo">
      <Teaser
        className="bg-black object-scale-down"
        alt="logo"
        src="https://www.reservix.net/app/themes/friendventure-reservix/dist/components/BasisFooter/Assets/reservix-logo-fbb6448c90.svg"
      />
    </Grid.Area>
    <Grid.Area name="social-media">
      <Teaser
        className="object-none object-left-top"
        alt="social media"
        src="https://www.reservix.net/app/uploads/resized/2023/12/Marketing-Expertise-collage-V2-1000x750-c-center.png"
      />
    </Grid.Area>
    <Grid.Area name="event-2">
      <Teaser
        alt="artist from back"
        src="https://cdn.pressebox.de/f/f3ebdc8b4e5375b5/attachments/1451457.attachment"
      />
    </Grid.Area>
    <Grid.Area name="tickets">
      <Teaser
        alt="tickets"
        src="https://www.reservix.net/app/uploads/resized/2023/11/tickets_reservix-1-1000x750-c-center.jpg"
      />
    </Grid.Area>
  </Grid>
);
```

## Props

### Grid

| Prop                   | Type                                                                 | Default  | Description                                                                                                                                                                                                                                                                   |
| :--------------------- | :------------------------------------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alignX                 | `"left" \| "center" \| "right" \| "between" \| "around" \| "evenly"` | -        | Horizontal alignment for the children.                                                                                                                                                                                                                                        |
| alignY                 | `"center" \| "top" \| "bottom"`                                      | -        | Vertical alignment for the children.                                                                                                                                                                                                                                          |
| **areas (required)**   | `string[]`                                                           | -        | Specifies the named grid areas, much like \`grid-template-areas\`.                                                                                                                                                                                                            |
| aria-describedby       | `string`                                                             | -        | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                               |
| aria-details           | `string`                                                             | -        | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                            |
| aria-label             | `string`                                                             | -        | Defines a string value that labels the current element.                                                                                                                                                                                                                       |
| aria-labelledby        | `string`                                                             | -        | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                         |
| aria-live              | `"off" \| "polite" \| "assertive"`                                   | -        | Indicates the level of importance for updates in the live region. - 'off': Updates are not announced unless focused. - 'polite': Updates are announced when the user is idle. - 'assertive': Updates are announced immediately, interrupting other announcements.             |
| children               | `ReactNode`                                                          | -        | Children of the layout.                                                                                                                                                                                                                                                       |
| **columns (required)** | `TemplateValue[]`                                                    | -        | Specifies the width of each column in the grid.                                                                                                                                                                                                                               |
| height                 | `HeightProp`                                                         | `"auto"` | Set the height of the element. You can see allowed tokens \[here]\(https\://tailwindcss.com/docs/height).                                                                                                                                                                     |
| id                     | `string`                                                             | -        | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                        |
| role                   | `(string & {}) \| "region"`                                          | -        | Identifies the element a significant section of content for easier navigation. When \`region\` is used as a role, an \`aria-label\` or \`aria-labelledby\` must be provided. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role). |
| **rows (required)**    | `TemplateValue[]`                                                    | -        | Specifies the height of each rows in the grid.                                                                                                                                                                                                                                |
| space                  | `GapSpaceProp`                                                       | `0`      | Set the spacing between child elements.                                                                                                                                                                                                                                       |

### Grid.Area

| Prop                | Type        | Default | Description                 |
| :------------------ | :---------- | :------ | :-------------------------- |
| children            | `ReactNode` | -       | Children of the component.  |
| **name (required)** | `string`    | -       | Name of the grid area slot. |

## Alternative components

Since the `<Grid>` component should be used when you need to create more complex layouts, the following components can can help you if you need simpler layout structures.

<ul>
  <li>[Tiles](/layout/tiles): With `<Tiles>` you have the possibility to create equal wide elements in a grid system.</li>
  <li>[Column](/layout/grid): If you need to have elements placed in one line.</li>
</ul>

## Related

- [Building layouts](../../foundations/layouts) - Learn how to build layouts.
