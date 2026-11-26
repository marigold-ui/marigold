# Examples: house rules

The pages under `/examples` are copied by people and agents as the reference for a real
Marigold app, so they follow one set of rules. They all belong to one invented customer,
**Riverside Events GmbH**, an event organiser.

## Data

0. **Mocked entities only.** Venues come from `@/lib/data/venues`, people from
   `@/lib/data/people`, the organisation, signed-in user and business figures from
   `_shared/demo-data.ts`. Use the reserved `example.com` for domains and email addresses. No
   real venue, company, institution or city next to invented figures. When an example needs
   more entities, invent them in the same world and say so in the file header.
1. **Dates are relative to today.** Use `daysAgo(n)` and `daysFromNow(n)` from
   `_shared/demo-data.ts`, and call them while rendering (in a function or the component),
   not at module level, so a long-running server does not freeze "today". The group layout
   renders per request for the same reason. Never write a fixed date that a reader would
   take as recent.
2. **Figures agree across pages.** A number that shows up on two pages (tickets sold,
   revenue, events on sale, venue count) comes from `businessNumbers` or
   `ticketsSoldByVenue`, not from a literal on the page.

## Content

3. **The header is product copy.** `Title` names the object or collection. `Description`
   says something the user needs, such as a count, a period or a consequence. No sentence
   explains the demo.
4. **One primary action per page**, in `Page.Header`. On a settings page, one per panel that
   saves on its own. Everything else is secondary or ghost.
5. **Sentence case** for every label, title, tab and button.
6. **Status is a `Badge` with a capitalised label from a map**, such as `userStatus`. Use
   colour only where it means something (ADR-0009). Never print a raw lowercase data value.
7. **Money and numbers go through `NumericFormat`, dates through `DateFormat`.** Store
   numbers as numbers, not as formatted strings.
8. **Toasts name the thing**: "Regional defaults saved", not "Settings saved".

## Layout

9. **Table recipe**: `Panel`, `Panel.Content bleed`, `Scrollable`, and an explicit
   `width`/`minWidth` per column, so a narrow screen scrolls instead of crushing the table.
   `rowHeader` on the name column, `alignX="right"` on numeric columns, a `VisuallyHidden`
   "Actions" header on an action column instead of `&nbsp;`. A wide table pins its name
   column with `sticky="start"`.
10. **Facts recipe**, until Marigold has a description list. In a narrow panel, rows of
    `Inline alignX="between"` with a muted `fontSize="sm"` label and a `weight="medium"`
    value, stacked with `Stack space="related"`. In a wide panel, `Stack space="tight"` pairs
    laid out with `Columns`. Never make every value semibold. A `Badge` sits beside the label
    row, not inside `Text`.
11. **Empty and error states use `EmptyState` and `ErrorState`**, with the next action inside
    them.
12. **Sibling surfaces sit `regular` (24px) apart**, the same gap `Page` puts between its
    children. `group` (48px) is for sub-groups inside one surface. Use spacing tokens, never
    numeric `space` values.
13. **No new raw `className`.** One avatar `<img>` per place is tolerated until Marigold has
    an Avatar.
