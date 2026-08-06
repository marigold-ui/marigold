---
'@marigold/components': patch
'@marigold/docs': patch
---

docs(DST-1427): promote `EmptyState` from beta to stable

`EmptyState` has been in beta since January. v18 is where its surface settled, with the title becoming a semantic heading behind a configurable `headingLevel` and the description moving onto the shared `Description` primitive, so the badge comes off now that the API being frozen is the one 18.0.0 ships. `title`, `description`, `action`, `headingLevel`, `variant` and `size` are covered by the usual semver guarantees from here on. No code changes.

The docs gain an Actions section, which the component had nothing on before. It maps the action's role to a Button variant and states the one-primary rule for the case where an empty state stands in for a page's content but the `Page.Header` above it already owns the page's primary action. Button's Surface actions section now names the components that reset the button cascade, since its "you rarely need to set a `variant` yourself" advice does not hold inside them.

The Anatomy section moves to the current convention. A themed inline `EmptyStateAnatomy` SVG replaces the static `emptystate-anatomy.jpg`, so the diagram follows light and dark mode instead of being a baked-in light-mode raster, and the section gains the labelled-parts list every other anatomy has.

Also fixes six dead links found while cross-referencing these pages. The app frame pattern pointed `EmptyState` at `/components/feedback/empty-state`, and the Button docs named a `ButtonLink` component at `/components/actions/button-link`, linked `SelectList.Option` to `/components/form/select-list`, and sent the `useActionState` callout to `/patterns/user-input/form-implementation`. That last route was dead in two more places, both in the recommended libraries list. All of these routes 404. They are now `/components/content/empty-state`, `LinkButton` at `/components/actions/link-button`, `/components/form/selectlist`, `/patterns/user-input/forms#async-forms-with-useactionstate`, and `/patterns/user-input/forms` plus `/patterns/user-input/forms#validation` for the two library references.
