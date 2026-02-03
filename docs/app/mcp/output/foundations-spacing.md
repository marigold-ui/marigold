# Spacing

_How spacing is applied and used._

Space is the invisible structure of our interface, not merely empty pixels, but the active connectivity that dictates hierarchy and logic. It follows a simple principle: distance signals relationship. Stronger bonds (like a label and input) require closer proximity.

To ensure consistency, we rely on semantic tokens instead of arbitrary values. This decouples intent from mathematics, allowing the interface to adapt across contexts. While a [4px grid](https://uxdesign.cc/the-4px-baseline-grid-89485012dea6) provides the underlying rhythm, these raw values are strictly a fallback. Semantic tokens should always be the primary choice to preserve design intent.

Effective spacing manages two distinct roles: the relationship between objects (relation) and the internal density of an object (inset).

## Relation (Space)

Relation describes the connection between elements. It defines hierarchy and grouping for margins, flex gaps, and grid gaps. The fundamental rule is:

> The tighter the space, the stronger the relationship.

When elements are strongly related, the bond is tight, and they pull close together. When they are distinct, the bond relaxes, and they drift apart.

To select the correct token for space, think in terms of _nouns_ (e.g., peer, group) because you are defining the nature of the relationship between neighbors. You are not asking "How large should this space be?" but rather "How closely related are these two elements?"

### Scale

The relational scale has 7 tokens, each with a specific purpose. This ensures a consistent rhythm across the interface, covering everything from small details to large page sections.

| Token   | Description                                                                                                                                                                                                                   | Common Patterns                                                                    |
| :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| Joined  | Elements appear attached to each other. They touch to function as a single interactive object, communicating that they act as one unit.                                                                                       | Segmented controls, button groups, ...                                             |
| Tight   | Refers to packed containers side-by-side without any wasted space, like a dense list of data cells or entries in a table. It communicates high-density scanning where maximum information is prioritized over breathing room. | Data table rows, multi-line card metadata, ...                                     |
| Related | This is the minimal unit of separation needed to acknowledge two elements are distinct. The small gap communicates that they form a single conceptual pair or thought, such as a label and its input field.                   | Label + Input, Icon + Text, Headline + Subhead, ...                                |
| Peer    | The wider, balanced space indicates two individual, self-contained elements standing as equals (Peers) within the same content flow. This is the page's standard reading rhythm.                                              | Standard form rows, list items, paragraphs, ...                                    |
| Group   | The substantial gap signifies logical separation or a change in zone. This is the level of space needed to clearly divide major content containers like a billing address section from a shipping address section.            | Cards in a grid, separating Fieldsets (e.g., Billing vs. Shipping), ...            |
| Section | Defines distinct sections of the layout structure. Creates necessary breathing room between primary areas like the main content and a sidebar, keeping them separate yet part of the same view.                               | Hero area vs. Page Content, Filter Bar vs. Results Grid, Chart vs. Data Table, ... |
| Context | Signifies a complete change in context or environment. Acts as a narrative break that allows the user to mentally reset before engaging with a new theme, such as moving from feature content to the footer.                  | Landing page sections (e.g., Features vs. Pricing), Content vs. Footer, ...        |

### Flow

Spacing is applied differently depending on the direction of content flow. Identifying the axis of flow ensures we apply the relational scale in a way that respects the component's internal logic.

#### Stack (Vertical flow)

The stack axis manages vertical rhythm, addressing how elements pile on top of one another down the page (Y-axis). This flow separates vertical siblings, like a label sitting above an input or paragraphs in an article.

```tsx title="spacing-stack"
import { Stack } from '@marigold/components';
import { FadeContainer } from '@/ui/FadeContainer';
import { VisualSpacing } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

export default () => (
  <FadeContainer fade="vertical">
    <div className="grid place-items-center *:w-1/2">
      <Stack alignX="left" space="peer">
        <Box className="h-20" />
        <VisualSpacing orientation="vertical" space="peer" />
        <Box className="h-20" />
        <VisualSpacing orientation="vertical" space="peer" />
        <Box className="h-20" />
      </Stack>
    </div>
  </FadeContainer>
);
```

#### Inline (Horizontal flow)

The inline axis governs the horizontal association of elements, managing how neighbors sit side-by-side (X-axis). This context determines the separation between horizontal siblings, such as buttons in a toolbar or an icon next to text.

```tsx title="spacing-inline"
import { Inline } from '@marigold/components';
import { FadeContainer } from '@/ui/FadeContainer';
import { VisualSpacing } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

/**
 * Wrapper div:
 * - bottom margin so the spacing guides show up
 * - define a width and height and stretch children to fill the height on
 *   inline so horizontal spacing works
 */

export default () => (
  <div className="mb-8 grid place-items-center *:h-12 *:w-10/12 *:items-stretch">
    <Inline alignX="left" space="group" noWrap>
      <FadeContainer fade="left">
        <Box className="w-32" />
      </FadeContainer>
      <VisualSpacing orientation="horizontal" space="group" />
      <Box className="w-20" />
      <VisualSpacing orientation="horizontal" space="group" />
      <Box className="w-32" />
      <VisualSpacing orientation="horizontal" space="group" />
      <FadeContainer fade="right">
        <Box className="w-24" />
      </FadeContainer>
    </Inline>
  </div>
);
```

#### Grid (Two-directional flow)

The grid axis handles the macro-layout skeleton where items flow in both X and Y directions simultaneously. This two-directional structure defines the gutters in complex layouts like dashboard masonry or image galleries, establishing a consistent rhythm across the entire 2-dimensional plane.

```tsx title="spacing-grid"
import { Inline, Stack } from '@marigold/components';
import { VisualSpacing } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

export default () => (
  <div className="mx-auto mb-8 w-54">
    <Stack alignX="left" space="tight">
      <div className="*:h-12 *:items-stretch">
        <Inline alignX="left" space="tight" noWrap>
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" hideGuide />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" hideGuide />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" hideGuide />
          <Box className="size-12" />
        </Inline>
      </div>
      <VisualSpacing orientation="vertical" space="tight" />
      <div className="*:h-12 *:items-stretch">
        <Inline alignX="left" space="tight" noWrap>
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" hideGuide />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" hideGuide />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" hideGuide />
          <Box className="size-12" />
        </Inline>
      </div>
      <VisualSpacing orientation="vertical" space="tight" />
      <div className="*:h-12 *:items-stretch">
        <Inline alignX="left" space="tight" noWrap>
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" />
          <Box className="size-12" />
        </Inline>
      </div>
    </Stack>
  </div>
);
```

#### CSS Tokens

You can construct relational CSS variables using the syntax shown below. By inserting a specific scale value (like `peer` or `group`), you can apply these tokens to gap or margin classes.

| Token Typ  | CSS Variable                  |
| :--------- | :---------------------------- |
| Relational | --spacing-\<relational scale> |

### Grouping

There are distinct ways to group content to guide the user's eye.

**Explicit grouping** uses visible boundaries like outlines, dividers, and cards to enclose related content. This is particularly effective for defining distinct interactive zones or isolating specific data sets from the surrounding layout.

**Implicit grouping** relies on proximity and open space to establish these relationships without visual lines. By placing related items close together, the eye naturally perceives them as a unit, reducing the need for heavy graphical dividers.

#### Not everything needs a container

A common pitfall in modern UI design is the overuse of explicit grouping where every piece of content is placed inside a box or a card. "Container fatigue" creates visual clutter and adds unnecessary weight to the interface.

Implicit grouping offers a cleaner alternative by leveraging the Relation tokens defined above. By simply placing related items closer together (using `tight` or `related`) and separating groups with larger gaps (using `group` or `section`), you create hierarchy naturally.

**Benefits of Implicit Grouping:**

- Reduced Visual Noise: Removing borders makes the interface lighter.
- Scannability: Fewer obstacles (lines) allow for faster scanning.
- Natural Hierarchy: Whitespace signals separation without cognitive load.

```tsx title="spacing-grouping"
import { venueTypes, venues } from '@/lib/data/venues';
import { Badge, Headline, Stack, Text, Tiles } from '@marigold/components';

const VenueCard = ({ id }: { id: (typeof venues)[number]['id'] }) => {
  const venue = venues.find(venue => venue.id === id)!;

  return (
    <Stack space="related">
      <div className="grid grid-cols-1 grid-rows-1">
        <img
          className="col-start-1 row-start-1 aspect-video w-full rounded-lg object-cover"
          src={venue.image}
          alt={venue.name}
        />
        <div className="col-start-1 row-start-1 pt-0.5 pl-1">
          <Badge variant="primary">{venueTypes[venue.type]}</Badge>
        </div>
      </div>
      <Text variant="muted" fontSize="xs">
        {venue.city}, {venue.country}
      </Text>
      <Headline level="3" lineHeight="none">
        {venue.name}
      </Headline>
      <div className="line-clamp-2 text-sm">{venue.description}</div>
    </Stack>
  );
};

export default () => {
  return (
    <Tiles space="group" stretch>
      <VenueCard id="12" />
      <VenueCard id="14" />
      <VenueCard id="21" />
      <VenueCard id="1" />
    </Tiles>
  );
};
```

## Inset (Padding)

Inset defines the internal breathing room of a container. It acts as a density dial: low inset (compact) optimizes for scanning data, while high inset (spacious) improves focus and touch interaction. Unlike the stack or inline axes which manage relationships between siblings, inset defines the relationship between a parent container and its children, pushing inward to frame content.

To choose a token, use _adjectives_ instead of nouns. You aren't defining a relationship between neighbors, but the intrinsic quality of the component itself. Is it compact? Is it regular?

This decouples density from context, ensuring components remain portable and predictable. A button preserves its internal structure (its inset) regardless of where it is placed. It could be inside a spacious marketing card, a standard modal, or a narrow sidebar. Instead of the layout parent implicitly shrinking or growing elements, the component declares its own physics.

### Scale

The scale has 5 tokens, each with a specific purpose. This ensures consistent density across the interface, covering everything from small details to large page sections.

| Token   | Description                                                                                                                                                      | Common Patterns                                         |
| :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| Tight   | Applies minimal padding to maximize information density. It is used when screen real estate is scarce and scanning speed is critical.                            | Data table cells, dense tooltips, micro-tags, ...       |
| Snug    | Creates a condensed look for small interactive elements. It fits content tightly to ensure elements can sit comfortably within restricted bars or dense layouts. | Chips, badges, compact toolbar items, ...               |
| Regular | The default volume for standard interactions. It provides a comfortable touch target and balanced white space for general UI components.                         | Buttons, standard cards, input fields, form blocks, ... |
| Relaxed | Introduces significant breathing room to separate distinct zones. It is used for containers that need to draw attention or stand apart from the main flow.       | Modals, generous cards, alert banners, ...              |
| Loose   | A structural inset for major layout blocks. It provides massive internal space to slow down the reading rhythm and frame high-impact content.                    | Hero sections, onboarding slides, empty states, ...     |

### Optical Corrections

While a square inset (equal padding on all sides) is the default, UI elements often require optical correction to look balanced. A button with equal padding often looks oddly tall, and a mobile card with standard padding loses too much horizontal space.

To solve this, we use _squish_ and _stretch_ modifiers. These generate a single token containing distinct values for the horizontal and vertical axes. These corrections maintain visual balance by reducing one dimension (either X or Y) to the next smallest step on the scale. For example, a 16px inset steps down to 8px on the compressed axis.

```tsx title="spacing-inset"
import { VisualInset } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

export default () => (
  <div className="flex items-end justify-center gap-28 pt-4 pb-10">
    <Box className="size-auto">
      <VisualInset
        name="regular"
        spaceX="3"
        spaceY="3"
        className="rounded-[calc(var(--radius-lg)-1px)]"
      >
        squared
      </VisualInset>
    </Box>

    <Box className="size-auto">
      <VisualInset
        name="regular"
        spaceX="3"
        spaceY="2"
        className="rounded-[calc(var(--radius-lg)-1px)]"
      >
        squished
      </VisualInset>
    </Box>

    <Box className="size-auto">
      <VisualInset
        name="regular"
        spaceX="2"
        spaceY="3"
        className="rounded-[calc(var(--radius-lg)-1px)]"
      >
        stretched
      </VisualInset>
    </Box>
  </div>
);
```

#### Squish (Vertical Compression)

Squish modifiers apply vertical compression to elements like buttons or table rows that need to align horizontally with the grid but maintain a compact vertical profile. By keeping the standard width and reducing the height, we preserve alignment while saving vertical space.

#### Stretch (Horizontal Compression)

Stretch modifiers apply horizontal compression, which is essential for mobile layouts or narrow columns (like sidebars) where screen real estate is limited. This approach maintains the vertical rhythm and breathing room so the design doesn't feel cramped, but reduces the horizontal padding to maximize content width.

#### CSS Tokens

You can construct inset CSS variables using the syntax shown below. By inserting a specific scale value (like `snug` or `relaxed`) and adding a geometry prefix (`square`, `squish`, or `stretch`), you can apply these tokens to padding properties.

| Token Typ | CSS Variable                     |
| :-------- | :------------------------------- |
| Square    | --spacing-square-\<inset scale>  |
| Squish    | --spacing-squish-\<inset scale>  |
| Stretch   | --spacing-stretch-\<inset scale> |

### Consistent Height

While semantic padding is preferred for most containers, certain interactive elements (like text inputs and buttons) require pixel-perfect height matching across different browsers. Browsers often calculate line-height and padding slightly differently, leading to sub-pixel mismatches.

In these cases, it is more effective to zero out vertical padding and rely on a fixed height token. This ensures the component occupies the exact same vertical space on every platform. By pairing this fixed height with explicit vertical centering (e.g. `align-items: center`), you ensure that text and icons remain perfectly balanced within the container.

> ℹ️ The Regulatory Minimum: Based on WCAG 2.2 Success Criterion 2.5.8 (Level AA), the absolute minimum
> size for a mouse target is 24 by 24 pixels. This does not require the
> visible element to be 24px, but the interactive container (hit area) must
> be at least 24px.If the target is smaller than 24px, it must have sufficient spacing so that
> a 24px diameter circle centered on it does not touch any adjacent target.

## Composition

Spacing is contextual rather than absolute, defined by the immediate container an element inhabits rather than the global page layout. To maintain a consistent rhythm, we treat every layout container as a self-contained universe where rules apply relative to that specific context, allowing the same semantic values to scale seamlessly across the hierarchy.

For example, consider the `related` token, which is typically used to separate distinct zones. Inside a single card (micro level), you use `related` to separate the header from the body content. On the dashboard (macro level), you use that same `related` token to separate one card from the next.

```tsx title="spacing-composition"
import { venues } from '@/lib/data/venues';
import {
  Card,
  Headline,
  Inset,
  Link,
  Stack,
  Tiles,
} from '@marigold/components';

const VenueCard = ({ id }: { id: (typeof venues)[number]['id'] }) => {
  const venue = venues.find(venue => venue.id === id)!;

  return (
    <Card p={0} stretch>
      <div className="grid overflow-hidden rounded-[calc(var(--radius-surface)-3px)]">
        <img
          className="col-start-1 row-start-1 aspect-square w-full scale-150 object-cover"
          src={venue.image}
          alt={venue.name}
        />
        <div className="relative col-start-1 row-start-1 mx-2 mb-2 self-end rounded-lg bg-white/40 shadow-lg inset-shadow-xs inset-shadow-white/75 backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-br from-white/90 to-transparent"></div>
          <div className="relative z-10">
            <Inset space={2}>
              <Stack space="related">
                <Headline level="3" lineHeight="none">
                  {venue.name}
                </Headline>
                <div className="line-clamp-2 text-sm">{venue.description}</div>
                <Link href="#" variant="secondary" size="small">
                  Learn more
                </Link>
              </Stack>
            </Inset>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default () => {
  return (
    <Tiles space="related" stretch>
      <VenueCard id="10" />
      <VenueCard id="6" />
      <VenueCard id="13" />
      <VenueCard id="8" />
    </Tiles>
  );
};
```

It might seem intuitive to make the page-level spacing larger than the card-level spacing. However, because the cards usually have visible boundaries (explicit grouping), that visual weight already handles the heavy lifting of separation.

You don't need to double the whitespace to tell the user "these are two different cards." The border does that job. The spacing token simply ensures they adhere to the system's rhythm. By reusing the same token, you create a fractal-like consistency where the interface feels harmonious from the smallest detail to the widest layout.
