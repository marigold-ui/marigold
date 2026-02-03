# Elevation

_Learn how to use elevation with Marigold._

Elevations serve as the foundational layers of the UI, providing a clean slate upon which various UI elements can be placed. It is important for creating visual hierarchy, depth, and clarity within a user interface. It guides user attention, improves usability, and enhances the overall user experience by providing feedback, organizing elements, and maintaining consistency in branding.

We create different surface levels, for each layer that a component can be placed.
The elevation consists of background colors and shadows. Meaning a background surface should be used together with a shadow surface token to create more depth.

## Types of elevation

We support four levels of elevation.

These elevation levels are important for creating visually appealing and user-friendly interfaces, as they help users understand the organization and hierarchy of content within an application or website. By using different elevation levels appropriately, designers can improve usability and enhance the overall user experience.
Starting by the lowest elevation level, the types will be explained in the following.

### Sunken

The deepest surface level we support is sunken. Sunken surfaces should only be used on the default surface level. Avoid applying sunken elevations to raised or overlay elevations.

Use the utility class:

- `util-surface-sunken`

This utility combines `surface-sunken` and `surface-sunken-shadow` tokens.

```tsx title="surface-sunken"
import { Card, Headline, Link } from '@marigold/components';

export default () => {
  return (
    <div className="util-surface-body m-auto w-96">
      <div className="util-surface-sunken rounded-xl p-4">
        I'm sunken 👋
        <Card>
          <Headline level={3}>Sunken</Headline>
          <section>
            <p>
              Sunken is the lowest elevation available. The sunken surface
              creates a backdrop (or well) where other content sits. Columns on
              a Kanban board are a good example of the sunken elevation.
            </p>
            <Link
              href="https://atlassian.design/foundations/elevation/#sunken"
              target="blank"
            >
              source
            </Link>
          </section>
        </Card>
      </div>
    </div>
  );
};
```

### Default (Body)

The default surface acts as the ground-surface level. It has no visual lift and should be the starting point of each page. This can be for example the `<body>`.

Use the utility class:

- `util-surface-body`

This utility combines `surface-body` and `surface-body-shadow` tokens.

```tsx title="surface-default"
import { Link } from '@marigold/components';

export default () => {
  return (
    <div className="util-surface-body m-auto w-96">
      <p>I'm surface default and fill out the whole page</p>

      <Link
        href="https://atlassian.design/foundations/elevation/#default"
        target="blank"
      >
        read more about me here
      </Link>
    </div>
  );
};
```

### Raised

Raised is one level higher than the default surface. It will be used for example on `<Card>`s. The intent of raised surface elevation is to make certain elements stand out more in the design, showing that they're more important or prominent.

Use the utility class:

- `util-surface-raised`

This utility combines `surface-raised`, `surface-raised-shadow`, and `surface-raised-border` tokens.

```tsx title="surface-raised"
import { Headline, Link } from '@marigold/components';

export default () => {
  return (
    <div className="util-surface-body m-auto w-96">
      <div className="util-surface-sunken rounded-xl p-4">
        <div className="bg-bg-surface-raised shadow-surface-raised rounded-lg p-4">
          <Headline level={3}>Raised</Headline>
          <section>
            <p>
              Raised elevations sit slightly higher than default elevations.
              They are reserved for cards that can be moved, such as Jira issue
              cards and Trello cards. In special circumstances, they can be used
              for cards as a way to provide additional heirarchy or emphasis.
            </p>
            <Link
              href="https://atlassian.design/foundations/elevation/#raised"
              target="blank"
            >
              source
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};
```

### Overlay

Overlay is the highest elevation used for elements that appear above others, like modals, dialogs, menus or popovers in general. Overlays can stack on top of other overlays.

Use the utility class:

- `util-surface-overlay`

This utility combines `surface-overlay`, `surface-overlay-shadow`, and `surface-overlay-border` tokens.

```tsx title="surface-overlay"
import { Headline, Link } from '@marigold/components';

export default () => {
  return (
    <div className="util-surface-body m-auto w-96">
      <div className="util-surface-overlay rounded-lg p-4">
        <Headline level={3}>I should be a Popover!</Headline>
        <p>
          Overlay is the highest elevation available. It is reserved for a UI
          that sits over another UI, such as modals, dialogs, dropdown menus,
          floating toolbars, and floating single-action buttons.
        </p>
        <Link
          href="https://atlassian.design/foundations/elevation/#overlay"
          target="blank"
        >
          source
        </Link>
      </div>
    </div>
  );
};
```

## Usage all together

In a common layout the surface default is always the ground base for other elements. You should take use of it and avoid excessive use of raised and overlay elevations. Make sure to use the shadow tokens correctly with the background tokens.

In this example all elevation levels are shown in a full page example layout. The surface default behaves as the ground-surface, with the sunken and raised surfaces for creating a visual hierarchy. Overlay surface will be on elements like `Popover`.

#### B2B

#### CORE

## Related

- [List of all Design Tokens](/foundations/design-tokens)
- [Design Token Guidelines](/getting-started/design-token-guidelines)
