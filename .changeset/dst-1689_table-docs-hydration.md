---
'@marigold/docs': patch
---

fix(DST-1689): make the Table cell alignment demo render the same on server and client

`table-cell-alignment.demo.tsx` built its `nights` and `guests` columns with
`Math.floor(Math.random() * n)` at render time. `ComponentDemo` is a client
component, so the demo is server-rendered and then hydrated, which ran the
generator twice and produced two unrelated datasets. React reported a hydration
mismatch on the first Nights cell and regenerated the whole table on the client,
so all eight generated cells visibly swapped values after the first paint. Three
consecutive requests to the page returned three different tables.

The two columns now come from a fixed four-entry fixture, merged into the venue
data by index, and the derivation moves to module scope because it no longer
depends on anything per render. The guest counts span one, two and three digits
and stay under each venue's capacity, so the demo makes its own point about right
alignment better than the random values did.

`table-appearance.demo.tsx` also rendered `<Table {...props}>`, and `AppearanceDemo`
passes only `variant` and `size`, so that grid had no accessible name. It now
carries `aria-label="Venues"`, matching how `listview-appearance.demo.tsx` labels
the same shape. That was the whole source of the seven react-aria warnings the
page logged, which fire once per render pass.

Further console findings on neighbouring pages, same class of defect, fixed here
rather than left behind:

`selectlist-selectable-cards.demo.tsx` formatted capacity and price with
`Number.prototype.toLocaleString()` and no locale argument, so it read the JS
runtime default: en-US under Node, the viewer's own locale in the browser. That
rendered `$1,000` on the server and `$1.000` on a de-DE client, a second
hydration mismatch. `ComponentDemo` already pins `<I18nProvider locale="en-US">`
to prevent exactly this, but `toLocaleString` bypasses the provider entirely.
Both values now use `NumericFormat`, which reads the pinned locale through
`useNumberFormatter`. The rendered text is unchanged (`$1,000`, no cents, via
`maximumFractionDigits`), but the DOM gains a `<span suppressHydrationWarning>`
per value. `NumericFormat` defaults to `tabular`, which suits the price and not
the middle of a sentence, so the capacity passes `tabular={false}` and keeps the
proportional figures the prose had before.

The two closest copies of that code are fixed with it. `card-grid.demo.tsx`
repeated both lines verbatim. `card-appearance.demo.tsx` rendered its price range
as two bare `toLocaleString()` calls on four- and five-digit values, so the
grouping separator always fired there. The range now goes through a single
`NumericFormat` with a tuple value, which formats it through `Intl.formatRange`
and reproduces the same en dash and spacing the hardcoded `&ndash;` produced.

`menu-dialog.demo.tsx` wrapped each controlled dialog in `<Dialog.Trigger>` with
the `<Dialog>` as its only child. `Dialog.Trigger` wraps its children in a
`PressResponder` to turn a child into the trigger, and a `Dialog` never registers
a press, so react-aria warned four times (two dialogs, doubled by StrictMode's
effect). These dialogs are opened by the menu items, so they need no trigger at
all: `open` and `onOpenChange` move onto `Dialog` itself, which already renders
its own `Modal`. That is what `ConfirmationDialog` and `useConfirmation` do
internally. Verified unchanged: both dialogs open from the menu, `slot="close"`
still closes them, `role="alertdialog"` and the `aria-labelledby` title wiring
survive, and Escape still dismisses.
