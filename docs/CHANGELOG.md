# @marigold/docs

## 18.0.0-beta.4

### Major Changes

- fc8ca13: refa([DST-1549]): **Breaking change**: Rename compound member `Tabs.TabPanel` → `Tabs.Panel`

  `Tabs` now exposes `.List`, `.Item`, and `.Panel`, so every compound member follows
  one predictable naming rule. `<Tabs.TabPanel>` is removed (hard rename, no deprecated alias).

  **Migration:**

  | Before                   | After                 |
  | ------------------------ | --------------------- |
  | `<Tabs.TabPanel id="…">` | `<Tabs.Panel id="…">` |

### Minor Changes

- 7fc3b53: feat(DST-1446): `marigold search` to find components by docs content

  Adds `marigold search <query>`, which ranks components by matching the query against their docs content (title, description, section headings, and section prose), not just the component name. This collapses the "list → guess → docs → retry" discovery loop (3 to 5 calls) that AI agents run today into a single ranked, snippet-bearing, deep-linked result.

  - **CLI:** new `loadSearchIndex()` / `searchComponentDocs()` library functions and a `search` command wrapping them, with `--limit`, `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache and `sanitizeRemote` — no new dependencies). Scoring weights title ×3, description ×2, each matching heading ×2, and each matching section snippet ×1. Tab completion and telemetry cover the new command. No-match exits 0 (`[]` for `--format json`).
  - **Docs:** `build-manifest.mjs` now also emits `public/component-search.json` — a content index over the component MDX (per-component `headings` plus prose-bearing `{ heading, snippet }` sections, with JSX/imports/code-fences stripped). It is written after `manifest.json` so a content-index bug can never block the manifest that `list`/`docs` depend on.

- 762989f: docs(DST-1198): add Fetching and Mutations pattern for `@tanstack/react-query` + Marigold

  Adds a new `Data` pattern group with a `Fetching and Mutations` page covering hook encapsulation, centralized query keys, the `isLoading` vs `useIsFetching` loading taxonomy, error handling and retries via `throwOnError` with an error boundary, toast feedback, optimistic updates, and destructive confirmation with `useConfirmation`. It also points to React Server Components and Server Actions as the alternative paradigm.

  The `/examples/filter` reference app now fetches from a real stateless `/api/venues` route handler: search, filter, sort and pagination run on the server, the query key is derived from the existing URL (nuqs) state, and rows can be deleted with confirmation and optimistic updates. Deletions are tracked per visitor on the client so the demo stays isolated and resets on reload.

### Patch Changes

- a912c89: Improve spacing between sidebar navigation sections for better visual separation.
- 6d7b6c6: docs(DST-1383): add the Bulk Actions pattern

  New user-input pattern page documenting how to let users select many records in a collection and act on all of them at once, built by composing existing Marigold components (`<Table>` selection, `<ActionBar>`, `<Dialog>` via `useConfirmation`, `<Drawer>`, `<Toast>`). Covers the full flow in build order: when (not) to use the pattern, structure, choosing actions, selection and its visible-scope boundary, direct actions, confirming destructive actions, multi-field bulk edit, progress feedback, and result/partial-failure handling. Includes an anatomy diagram, seven inline demos, Do/Don't guidance, an accessibility section, and an implementation section with the load-bearing practices (derive the acted-on set once, clear selection on scope change, keep failed records selected, re-key the bulk-edit form).

  [DST-1383](https://reservix.atlassian.net/browse/DST-1383)

- 6d7b6c6: docs(DST-1384): add the Bulk Actions working example

  New full-page example at `/examples/bulk-actions` that wires the whole bulk-actions pattern together as one real product surface: a paginated, searchable events table with page-bounded selection, a floating `ActionBar` (Publish, Edit, Export, overflow menu, Delete), direct publish with a deterministic partial-failure path whose failed records stay selected and are fixable via the bulk-edit `Drawer` (mixed values, explicit price opt-in, re-keyed per selection), a destructive confirm `Dialog` with count and reservation impact, button-loading and running-count progress, and toasts for every outcome. Backed by a stateless `/api/events` route plus a `/api/events/bulk` authorizer; all session changes are client-owned and ride along in the query key, so filters always see the visitor's world. Search, status filter, and page persist in the URL via nuqs. The pattern page's `DemoLinks` now resolves and its "in progress" callout is gone.

  [DST-1384](https://reservix.atlassian.net/browse/DST-1384)

- c5bfbb1: docs(DST-1405): document the Marigold CLI on the docs site

  Adds a new **CLI** page under Getting Started (`/getting-started/cli`). The single page covers installation (npm / pnpm / npx), usage with AI agents, every command (`docs`, `list`, `examples`, `init`, `completion`, `telemetry`) with flags and examples, and configuration (environment variables and per-OS cache / config locations). Content mirrors `packages/cli/README.md`.

  Cross-links were added from the Installation page (`marigold init` as a faster setup path) and the Usage with AI page (the AI-agents section of the new CLI page).

- 21e79b7: docs(DST-1465): position Card among Collection components and link out to alternatives

  Reframes the Card docs to lead with Card's Collection identity. Adds a `Card vs Table` in-category comparison with a new `CardVsTableMockup` illustration, a `When the content isn't a collection` section pointing to Panel, Stack, and Tiles, and a top-level `Alternative components` section that links out to the right component for each case.

- 5b9e78d: docs(DST-1474): write the ActionBar component documentation

  Replaces the boilerplate ActionBar page with full, use-case-driven documentation: an intro that frames it as a bulk-action toolbar for the current selection in a collection, an anatomy diagram, Do/Don't guidance, and three demos (bulk actions in a `<Table>` via the `actionBar` render prop, bulk editing through a `<Drawer>`, and driving the bar from custom selection state outside a Table). Adds an accessibility section covering the labelled toolbar, the live-region announcement, Escape-to-clear, and focus restoration.

  [DST-1474](https://reservix.atlassian.net/browse/DST-1474)

- 4f9cd66: docs(DST-1532): add the Pick pattern with demos and a working example

  New user-input pattern page documenting picking: finding records in a collection and committing them as a set, the counterpart to filtering, which narrows a view in place. Covers the Filter-vs-Pick distinction, a surface spectrum that scales to collection size (inline multi-select, a searchable `<TagField>`, a `<Dialog>`, and a routed page as the exception), and the load-bearing practices: preserve staged selections while search and filters narrow the list, bound the selection and name the outcome in the commit button, keep the staged set visible as a removable `<Tag.Group>` rail, and narrow rather than paginate large or async collections. Ships four inline demos (`<TagField>`, a multi-select `<Table>` dialog, a `<SelectList>` variant, and an on-page filter-select-act signpost) plus a full `/examples/pick` example: a `size="fullscreen"` dialog that picks from about fifty venues into a report that owns the committed set. Cross-references the pattern from the Filter and Table Records pages.

  [DST-1532](https://reservix.atlassian.net/browse/DST-1532)

- d257bff: feat(DST-1574): surface example apps in the docs ⌘K search

  The interactive example demos are now discoverable from the docs command menu. Typing an example's name — or just "example" — lists the standalone demos (App Shell, Filter, Event Form, Settings Form, Auto-Save Settings, Inventory) as "Example: …" quick actions. Internal screens of a larger demo (e.g. the App Shell's Billing/Users/Teams pages) are intentionally not surfaced as separate examples.

- 4a75d68: docs(DST-1623): note that `<ToastProvider>` should be mounted once

  Every toast shares one global queue (React Aria's model: a single `ToastRegion` per queue), so one `<ToastProvider>` renders them all and `addToast` works from anywhere. Mounting more than one renders every toast per provider and creates duplicate notification `region` landmarks. React Aria surfaces this via its duplicate-landmark-label warning and does not dedupe. Added a callout on the Toast page documenting the "mount once" guidance.

  [DST-1623](https://reservix.atlassian.net/browse/DST-1623)

- Updated dependencies [c789dee]
- Updated dependencies [28c4e40]
- Updated dependencies [9918172]
- Updated dependencies [f1990eb]
- Updated dependencies [d72b30a]
- Updated dependencies [be0eeb9]
- Updated dependencies [9b613e6]
- Updated dependencies [cff8f37]
- Updated dependencies [e9996ef]
- Updated dependencies [0b7f87f]
- Updated dependencies [c20abe3]
- Updated dependencies [13a1982]
- Updated dependencies [d72f464]
- Updated dependencies [9fd4000]
- Updated dependencies [f715905]
- Updated dependencies [0637671]
- Updated dependencies [e686474]
- Updated dependencies [c799448]
- Updated dependencies [dd044be]
- Updated dependencies [50d8339]
- Updated dependencies [ecd739f]
- Updated dependencies [2fc7b96]
- Updated dependencies [586ffd1]
- Updated dependencies [af7767c]
- Updated dependencies [8418ee7]
- Updated dependencies [fc8ca13]
- Updated dependencies [f1990eb]
- Updated dependencies [508ec2c]
- Updated dependencies [2a275bb]
- Updated dependencies [ae6644d]
- Updated dependencies [e911844]
- Updated dependencies [f69ba1c]
- Updated dependencies [90d8af7]
- Updated dependencies [136a4be]
- Updated dependencies [018c055]
- Updated dependencies [018c055]
- Updated dependencies [018c055]
- Updated dependencies [c30f224]
- Updated dependencies [0e4b915]
- Updated dependencies [51484fd]
- Updated dependencies [51484fd]
- Updated dependencies [b6666b4]
- Updated dependencies [66a22e8]
- Updated dependencies [7605d46]
- Updated dependencies [40b006e]
- Updated dependencies [f817023]
- Updated dependencies [5d0b6c0]
- Updated dependencies [e5701c4]
- Updated dependencies [a34b353]
- Updated dependencies [306fe23]
- Updated dependencies [199e066]
- Updated dependencies [106821a]
- Updated dependencies [3231866]
- Updated dependencies [40e6b21]
- Updated dependencies [867f3cc]
- Updated dependencies [b954ab2]
- Updated dependencies [2b3e286]
- Updated dependencies [d0bb11c]
- Updated dependencies [b41a3e3]
- Updated dependencies [be0eeb9]
- Updated dependencies [be0eeb9]
- Updated dependencies [ccd3bb3]
- Updated dependencies [766a46b]
- Updated dependencies [0e3971a]
- Updated dependencies [4d44517]
  - @marigold/components@18.0.0-beta.4
  - @marigold/theme-rui@6.0.0-beta.4
  - @marigold/system@18.0.0-beta.4
  - @marigold/icons@2.0.0-beta.4

## 18.0.0-beta.3

### Patch Changes

- bd45aee: feat(DST-876): add Card usage guidelines

  Renames the `Card.Preview` slot to `Card.Media` across components, theme, and docs. This is a breaking change: consumers using `<Card.Preview>`, the `data-card-preview` selector, or the `preview` theme slot key must migrate to `Card.Media`, `data-card-media`, and the `media` slot key respectively.

  Adds a "Usage" section to the Card docs covering when to use cards, media slot guidance.

- 36b03b5: docs: remove dash punctuation and semicolons from documentation prose

  Rewrites em-dash and en-dash punctuation and prose semicolons across the
  component, foundation, and pattern docs into plain sentences for easier
  reading. Numeric ranges now read as "N to M". Example strings that show
  literal component output (date and number range formatting, filter chip
  labels) keep their en-dash because it represents real output.

- 1ca43c2: docs(DST-1487): move ActionBar docs from "Actions" into the "Collection" section

  `<ActionBar>` is the floating toolbar of bulk actions for the current selection in a collection, not a generic action primitive. Its docs page moves from `components/actions/actionbar` to `components/collection/actionbar`, sitting alongside `Table`, `Card`, and `Tag`.
  - The page description and intro are reframed around the collection/bulk-selection context, and a `Related` section now links back to `Table` and `Button`.
  - Internal links in `ActionButton`, `ActionGroup`, `Button`, and `Drawer` are repointed to the new path. Historical release-note links are left untouched.

- 11ff07a: docs(DST-1226): restructure form documentation for clarity and discoverability

  Consolidates three pages (Form Fields, Forms, Form Implementation) into two:
  - **Form Fields** (Foundation): slimmed down to anatomy, label, placeholder, help text, width, and field states. New SVG anatomy diagram replaces the static image. Validation content and the redundant component list are removed.
  - **Forms** (Pattern): merges design/layout content with validation (native, custom, real-time, server errors, Zod) and state management (controlled vs uncontrolled, FormData submission, conditional fields, error handling, react-hook-form, async with `useActionState`).

  The standalone Form Implementation page is removed, and 18 cross-references across component and pattern pages are repointed to the merged Forms page.

- Updated dependencies [5945653]
- Updated dependencies [141a2cc]
- Updated dependencies [bd45aee]
- Updated dependencies [16bcb56]
- Updated dependencies [263c5e6]
- Updated dependencies [75cab86]
- Updated dependencies [0760ecc]
- Updated dependencies [6430567]
- Updated dependencies [14f1324]
- Updated dependencies [431d4dd]
- Updated dependencies [141a2cc]
- Updated dependencies [4d20fb6]
- Updated dependencies [fc9ffb1]
- Updated dependencies [334688e]
- Updated dependencies [334688e]
- Updated dependencies [9cdb389]
  - @marigold/components@18.0.0-beta.3
  - @marigold/system@18.0.0-beta.3
  - @marigold/theme-rui@6.0.0-beta.3
  - @marigold/icons@2.0.0-beta.3

## 18.0.0-beta.2

### Patch Changes

- Updated dependencies [3a62175]
- Updated dependencies [2a34a64]
- Updated dependencies [61f917f]
- Updated dependencies [d51416c]
- Updated dependencies [a59d2dd]
- Updated dependencies [9a407ef]
  - @marigold/components@18.0.0-beta.2
  - @marigold/system@18.0.0-beta.2
  - @marigold/theme-rui@6.0.0-beta.2
  - @marigold/icons@2.0.0-beta.2

## 18.0.0-beta.1

### Major Changes

- 9f4dc97: refa([DST-1324]): **Breaking change**: Rename Inset's `space`/`spaceX`/`spaceY` props to `p`/`px`/`py`

  The padding props on `Inset` are renamed to align with `Panel`'s existing API, so that across the design system `space` always means **gap between children** and `p`/`px`/`py` always mean **inner padding**. Previously, `space` carried two different meanings depending on the component, which was a source of confusion.

  **Migration:**

  | Before                            | After                     |
  | --------------------------------- | ------------------------- |
  | `<Inset space="…" />`             | `<Inset p="…" />`         |
  | `<Inset spaceX="…" spaceY="…" />` | `<Inset px="…" py="…" />` |

  The discriminated union shape is unchanged: `p` is mutually exclusive with `px`/`py`. Token vocabularies are unchanged (`InsetSpacingTokens` for `p`, `PaddingSpacingTokens` for `px`/`py`).

### Patch Changes

- 727163c: feat([DST-1134]): add `<RangeCalendar>` component (alpha)

  Adds a new `<RangeCalendar>` for selecting a contiguous or non-contiguous date range, built on react-aria's `<RangeCalendar>` with Marigold conventions (`disabled`, `readOnly`, `error`, `dateUnavailable`, `allowsNonContiguousRanges`). Supports up to three side-by-side months via `visibleDuration`, stacking vertically below the `sm` breakpoint; the same responsive stacking now applies to multi-month `<Calendar>` for parity. `description` and `errorMessage` route through `<FieldBase>` so the help/error UI matches the rest of the form-component family (TriangleAlert icon + HelpText container). Ships as an alpha component with a stub docs page under the form section.

  [DST-1134](https://reservix.atlassian.net/browse/DST-1134)

- 8c8e2da: docs(DST-1382): expand Drawer documentation with use cases and decision framework

  Rewrites the Drawer docs to lead with a defining principle (supplementary, in-context, light task; non-modal on desktop), adds a decision framework (Drawer vs Dialog, routing to a page instead), and documents six canonical use cases: detail-row inspection, quick edit/create from a list, filter panel, comments and activity, contextual utility, and multi-field bulk edit. New demos illustrate the table-row inspection, comments/activity, and Table+ActionBar bulk-edit patterns. Filter pattern moved to a `## Related` section.

- a244486: docs(DST-1308): consolidate icon documentation onto the Iconography page

  Merge the former `/foundations/icons` and `/components/content/icon` pages into `/foundations/iconography` so principles, catalog, and engineering API live in one place. The new `Using icons in code` section covers installation, importing, sizing, color (`currentColor` + `className` recommended; `color` prop is literal CSS), filled brand icons, and accessibility (auto `aria-hidden`).

  ## Migration table

  Old names from the legacy `@marigold/icons` set and their Lucide replacement. Names marked _custom_ are retained brand icons that still ship from `@marigold/icons` directly.

  ### UI

  | Old             | New                |
  | --------------- | ------------------ |
  | Add             | `Plus`             |
  | ArrowDown       | `ArrowDown`        |
  | ArrowLeft       | `ArrowLeft`        |
  | ArrowRight      | `ArrowRight`       |
  | ArrowUp         | `ArrowUp`          |
  | BurgerMenu      | `Menu`             |
  | Check           | `Check`            |
  | ChevronDown     | `ChevronDown`      |
  | ChevronLeft     | `ChevronLeft`      |
  | ChevronRight    | `ChevronRight`     |
  | ChevronUp       | `ChevronUp`        |
  | CircleChecked   | `CircleDot`        |
  | CircleUnchecked | `Circle`           |
  | Delete          | `Trash2`           |
  | ExternalLink    | `ExternalLink`     |
  | Eye             | `Eye`              |
  | Filter          | `ListFilter`       |
  | IconMore        | `Ellipsis`         |
  | Remove          | `Minus`            |
  | Search          | `Search`           |
  | SettingDots     | `EllipsisVertical` |
  | SquareChecked   | `SquareCheck`      |
  | SquareUnchecked | `Square`           |

  ### Info

  | Old             | New                    |
  | --------------- | ---------------------- |
  | Accessible      | `Accessibility`        |
  | AutoRenew       | `RefreshCcw`           |
  | Banned          | `Ban`                  |
  | BatteryCharging | `BatteryCharging`      |
  | BatteryEmpty    | `BatteryLow`           |
  | BatteryFull     | `BatteryFull`          |
  | BatteryHalf     | `BatteryMedium`        |
  | Bus             | `BusFront`             |
  | Calendar        | `Calendar`             |
  | Camera          | `Camera`               |
  | Clock           | `Clock`                |
  | Direction       | `SquareArrowUpRight`   |
  | Email           | `Mail`                 |
  | EventDate       | `Calendar1`            |
  | Exclamation     | `TriangleAlert`        |
  | Feedback        | `MessageSquareMore`    |
  | Food            | `Utensils`             |
  | Globe           | `Globe`                |
  | Home            | `House`                |
  | Info            | `Info`                 |
  | Marker          | `MapPin`               |
  | MobilePhone     | `Smartphone`           |
  | MobileSignal    | `SignalHigh`           |
  | Notification    | `MessageSquareWarning` |
  | Parking         | `CircleParking`        |
  | PDF             | `PDF` _(custom)_       |
  | Reports         | `FileText`             |
  | Required        | `Asterisk`             |
  | ResaleLogbook   | `BookOpenText`         |
  | Spinner         | `Loader`               |
  | Thumb           | `ThumbsUp`             |
  | Truck           | `Truck`                |
  | Wifi            | `Wifi`                 |

  ### Action

  | Old          | New                     |
  | ------------ | ----------------------- |
  | Cancel       | `CircleX`               |
  | Crop         | `Crop`                  |
  | Download     | `Download`              |
  | Edit         | `Pencil`                |
  | ExportFile   | `SquareArrowOutUpRight` |
  | FormatBold   | `Bold`                  |
  | FormatItalic | `Italic`                |
  | FormatSize   | `ALargeSmall`           |
  | HighlightOff | `Power`                 |
  | Location     | `LocateFixed`           |
  | Lock         | `Lock`                  |
  | LockOpen     | `LockOpen`              |
  | Logout       | `LogOut`                |
  | Pause        | `Pause`                 |
  | Picture      | `Image`                 |
  | Play         | `Play`                  |
  | ResaleEdit   | `Cog`                   |
  | Restart      | `RotateCcw`             |
  | RotateLeft   | `RotateCcw`             |
  | RotateRight  | `RotateCw`              |
  | Save         | `Save`                  |
  | Sort         | `ChevronsUpDown`        |
  | SortDown     | `ChevronDown`           |
  | SortUp       | `ChevronUp`             |
  | Star         | `Star`                  |
  | Stop         | `CircleStop`            |
  | Underlined   | `Underline`             |
  | Zoom         | `ZoomIn`                |

  ### Ticketing

  | Old             | New                          |
  | --------------- | ---------------------------- |
  | Deal            | `BadgePercent`               |
  | DesignTicket    | `DesignTicket` _(custom)_    |
  | GiftCard        | `GiftCard` _(custom)_        |
  | Membership      | `IdCardLanyard`              |
  | Pickup          | `Store`                      |
  | Price           | `Euro`                       |
  | Resale          | `Resale` _(custom)_          |
  | Scanner         | `Scanner` _(custom)_         |
  | Seat            | `Armchair`                   |
  | Selling         | `Tag`                        |
  | Stadium         | `Stadium` _(custom)_         |
  | Ticket          | `Ticket`                     |
  | TicketInsurance | `TicketInsurance` _(custom)_ |
  | Turnstile       | `Turnstile` _(custom)_       |

  ### User

  | Old                    | New            |
  | ---------------------- | -------------- |
  | Cart                   | `ShoppingCart` |
  | CreditCard             | `CreditCard`   |
  | Group                  | `UsersRound`   |
  | Id                     | `IdCard`       |
  | SmilieDissatisfied     | `Frown`        |
  | SmilieNeutral          | `Meh`          |
  | SmilieSatisfied        | `Smile`        |
  | SmilieVeryDissatisfied | `Angry`        |
  | SmilieVerySatisfied    | `Laugh`        |
  | User                   | `UserRound`    |

  ### Social

  | Old       | New                    |
  | --------- | ---------------------- |
  | Google    | `Google` _(custom)_    |
  | Instagram | `Instagram` _(custom)_ |
  | Share     | `Share2`               |
  | Twitter   | `Twitter` _(custom)_   |

  `TwitterX` is also available for the post-rebrand X mark; `Twitter` _(custom)_ remains for the bird mark.

- 496a9f2: feat(SelectList): standardized API, item layout, and visual distinction from ListBox (DST-1076)

  `<SelectList>` has been refined into a first-class form field for picking one or many items from a visible list of rich two-line rows. This release contains breaking renames and a tightened type surface.

  **Breaking changes**
  - `SelectList.Item` → **`SelectList.Option`**. The option semantic matches `Select.Option` and the HTML `<option>` mental model. Update any `<SelectList.Item>` usage to `<SelectList.Option>`.
  - `SelectList.Action` has been **removed**. Drop your `<ActionMenu>` or `<IconButton>` directly inside `<SelectList.Option>` — the component positions, sizes, and styles the nested control automatically via `ButtonContext`. Limit: one action per option (multi-button groups will arrive with a future `ActionGroup`).
  - Leading-image slot has been **removed**. Compose images inside `<Text slot="label">` (or anywhere in children) as you see fit.
  - `selectionMode="none"` is no longer accepted. `SelectList` is a form field; the default is now `"single"`.
  - `onChange` is strictly typed per `selectionMode`: `(key: Key | null) => void` for single, `(keys: Key[]) => void` for multiple. The shape matches `Select<T, M>`. Passing `setState` directly may require adapting the callback.

  **Other changes**
  - **Selection indicator** — single-select rows render a visible radio circle; multi-select renders a checkbox.
  - **Label & description slots** — use `<Text slot="label">` and `<Text slot="description">` inside `<SelectList.Option>`. The row skeleton is `selection · label + description · action (optional)`.
  - **Dev-mode warning** when `textValue` is missing on an option whose children aren't a plain string.
  - **Own theme entry** — `SelectList` ships a dedicated theme component. The theme exposes first-class `label`, `description`, and `action` entries; slot styling no longer uses descendant selectors. Consumers with custom themes must add or update a `SelectList` entry.

  **Documentation**

  The SelectList docs page is rewritten around the new API. Adds an anatomy diagram, a decision table for choosing between `<SelectList>` and lighter controls (`<Radio.Group>`, `<Checkbox.Group>`, `<Select>`, `<Combobox>`, `<TagField>`), and dedicated sections for multi-selection, per-row actions (decision-help and configuration patterns), horizontal orientation, and empty state. Replaces selected prose with Do/Don't tiles. Tightens the accessibility section to what's specific to SelectList (keyboard model, label requirement, `textValue` for rich rows).

  **Migration**

  ```diff
  - <SelectList selectionMode="none">
  -   <SelectList.Item id="free">
  -     <SelectList.Action>
  -       <IconButton aria-label="Info"><Info /></IconButton>
  -     </SelectList.Action>
  -     Free
  -   </SelectList.Item>
  - </SelectList>
  + <SelectList selectionMode="single">
  +   <SelectList.Option id="free">
  +     Free
  +     <IconButton aria-label="Info"><Info /></IconButton>
  +   </SelectList.Option>
  + </SelectList>
  ```

- 63af0c1: docs(DST-1313): add settings form pattern and documentation:

  Add settings form and event form pattern examples at `/examples/settings-form` and `/examples/event-form`. The settings form demonstrates tabbed navigation, independent section saves with Panel, collapsible advanced fields, and a danger zone with confirmation dialogs. The event form shows a single-submit form with multiple Panel sections. Updates the forms pattern documentation with a Panels subsection and links to both demos.

  [DST-1313](https://reservix.atlassian.net/browse/DST-1313)

- 4b02dfe: feat([DST-1388]): split prop tables into main, aria and handler groups

  The interactive Props table (`<AutoTypeTable>`) on each component page now shows the meaningful API props by default and tucks `aria-*` / `role` attributes and React DOM event handlers into separate collapsible sections (e.g. Button drops from 112 visible props to 39 main + 10 aria + 63 handlers). The static markdown pipeline that feeds the LLM/MCP `search_docs` index is intentionally untouched, so machine-readable docs continue to expose the full prop list.

  [DST-1388](https://reservix.atlassian.net/browse/DST-1388)

- 20bf9c1: docs([DST-1314]): add full data management pattern with filtering

  Add a full-page data management pattern example at `/examples/filter` demonstrating venue browsing with multi-criteria filtering. The example includes a toolbar with search and filter controls, applied filter chips for active filter display, and a paginated data table all coordinated through URL state via `nuqs`.

- Updated dependencies [727163c]
- Updated dependencies [cc568e3]
- Updated dependencies [566c468]
- Updated dependencies [9f4dc97]
- Updated dependencies [2014edf]
- Updated dependencies [3c6a943]
- Updated dependencies [f8fbef9]
- Updated dependencies [4742e8e]
- Updated dependencies [496a9f2]
- Updated dependencies [a5678ed]
- Updated dependencies [5f2e9a0]
- Updated dependencies [496a9f2]
- Updated dependencies [8b754f0]
- Updated dependencies [5744bbf]
- Updated dependencies [2d9d6fd]
- Updated dependencies [2ff7bda]
  - @marigold/components@18.0.0-beta.1
  - @marigold/theme-rui@6.0.0-beta.1
  - @marigold/system@18.0.0-beta.1
  - @marigold/icons@2.0.0-beta.1

## 18.0.0-beta.0

### Major Changes

- f629319: refactor([DST-1283]): **Breaking Change** — Remove `<Multiselect>` (and the `react-select` dependency) from `@marigold/components`.

  Use `<TagField>` instead.

- 724f0ce: refa([DST-1162]): **Breaking changes**: The `Card` component has been refactored into a compound component pattern.

  **What changed:**
  - The previous prop-based API (`padding`, `space`, etc.) has been removed.
  - Content must now be composed using explicit sub-components: `Card.Header`, `Card.Content`, `Card.Footer`, and `Card.Preview`.
  - A `CardContext` is now required — sub-components will throw an error if used outside of a `<Card>`.

  **Migration:**

  ```tsx
  // Before
  <Card>
    <SomeContent />
  </Card>

  // After
  <Card>
    <Card.Header>Title</Card.Header>
    <Card.Content><SomeContent /></Card.Content>
    <Card.Footer>Actions</Card.Footer>
  </Card>
  ```

### Minor Changes

- 6587493: refa([DST-1298]): Refactor Divider component: API, styling, and docs

  We fixed the vertical orientation of the divider, which previously didn't work.
  Added new Divider stories and updated the Divider docs.

- 91f4312: feat: add MCP server for semantic search over Marigold docs

  Adds an MCP (Model Context Protocol) server at `/mcp` that lets AI coding assistants (Claude Code, VS Code Copilot, etc.) semantically search the Marigold documentation. An ETL pipeline (`pnpm build:embeddings`) chunks the MDX docs and generates vector embeddings via AWS Bedrock Titan v2, served via Streamable HTTP transport with Keycloak-authenticated access.

  [DST-1166](https://reservix.atlassian.net/browse/DST-1166)

### Patch Changes

- a69e719: refactor: adopt `Sidebar.Nav` `current` prop in demos and stories

  Replaces the hand-rolled `active={currentPath === '/...'}` pattern across Sidebar and AppLayout demos (documentation) and the `AppLayout` Storybook story with the new `current` prop on `Sidebar.Nav` (shipped in DST-1322 / #5306). The order-detail demo additionally leverages the new prefix-match semantics, so `/orders/:id` routes automatically highlight the `/orders` nav item without a regex fallback.

  No consumer-facing package behavior changes — only demos and an internal story.

- 7aa5128: Add unified demo app at `/examples` that consolidates all pattern demos (filter, form, inventory) alongside a full app-shell example. A shared shell layout renders the sidebar, breadcrumbs, and section switcher from a single navigation tree; each example page links back to its corresponding pattern guidelines. Removes all standalone pattern pages in favor of colocated demo routes.
- 1dbb3e2: fix(docs): make MCP and embedding env vars optional so `pnpm build:docs` works locally without `AWS_BEDROCK_*`, `OIDC_*`, or `BLOB_READ_WRITE_TOKEN` set. Also corrects the `claude mcp add marigold-docs` snippet to use the positional URL argument instead of `--url`.
- 0bf3239: fix: redesign Do/Don't guideline cards to match fumadocs

  Replaces the legacy Do/Don't design with a tinted card layout that uses fumadocs design tokens (`--color-fd-success`/`--color-fd-error`) and `lucide-react` icons. Adds proper dark mode support, which was previously broken due to hardcoded light-mode colors.

  [DST-1348](https://reservix.atlassian.net/browse/DST-1348)

- 2d8b8a3: docs(DST-1326): restructure the Layouts foundation around `Panel` + primitives

  Reworks the Layouts foundation page to frame the two responsibilities explicitly: `Panel` for page-level content sectioning, and the atomic layout primitives (`Stack`, `Inline`, `Inset`, `Split`, `Center`, `Tiles`, `Columns`) for everything inside. Adds a "Choosing the right layout" decision table, collapses the previous two-tier framing that implicitly treated `Panel` and `AppLayout` as peers, and replaces the wireframe demo with an annotated SVG anatomy diagram that mirrors the `Panel` and `Sidebar` anatomies. Also trims the component-principles Layout section to defer to this page, switches the `concepts-spacing` demo to `Wireframe.Box` for nicer visuals, and fixes `Wireframe.Box` colours after the `secondary-*` token removal by falling back to the Tailwind neutral palette.

- c821902: docs([DST-1032]): Revise installation guideline

  Revised the whole installation Guideline, to make it up to date and fix stuff that wasn't working.
  It now contains a more detailed description and has better examples.
  Users and AI should now be able to create a new project with Marigold, without a problem.

- 8326bf7: docs(DST-1326): add `Panel` component documentation

  MDX page, anatomy diagrams (header + collapsible), and a full set of demos covering appearance, variants, header actions, collapsible sections (incl. controlled + error state), footer, bleed content, danger-zone rows, and a `Panel` vs `Card` comparison.

- 9830f43: docs(DST-1331): flesh out app-shell example pages with realistic content

  Replaces the `PlaceholderPage` stand-in on the Analytics, Billing, General, Security, Teams, and Users routes with proper example screens built entirely from Marigold components. Each page uses `Panel` for page-level sections and reserves `Card` for repeating collection items (payment methods, active sessions, team cards, stat tiles). Removes the now-unused `PlaceholderPage` component.

- 7d96a7a: fix(docs): pre-compute prop-table data at build time, eliminate ts-morph from the runtime, ship per-page markdown and the page manifest as static assets.

  The Vercel preview build for the docs failed on `pnpm build` with:

  ```
  TypeError: Cannot read private member #state from an object whose class did not declare it
      at Reflect.get (<anonymous>)
  Export encountered an error on /api/manifest.json/route, exiting the build.
  ```

  Same crash subsequently surfaced on `/api/md/[...slug]/route` once the manifest was patched.

  **Root cause** (three things composing into one bug):
  1. Node 22+ undici's `Response` uses **private class fields** (`#state`) — see [undici#4290](https://github.com/nodejs/undici/issues/4290), [node#58814](https://github.com/nodejs/node/issues/58814).
  2. Next.js 16's `force-static` route-handler prerender wraps the returned `Response` in a JavaScript `Proxy`.
  3. The Proxy's handlers use `Reflect.get` to forward property access. JavaScript's private-field semantics intentionally prevent `Reflect.get` from forwarding through a Proxy when the receiver isn't an instance of the class declaring the field.

  So when Next.js's static exporter touches the proxied `Response` during prerender, undici's getters call `Reflect.get(target, '#state')`, which throws. The route handlers themselves run fine — the crash is on the way out, in the framework's prerender wrapper. The bug is environment-specific (Node 22+ × `force-static` × Vercel build) and does not reproduce locally on older Node versions.

  **Fix and surrounding cleanup**

  The data both endpoints serve (per-page markdown, page-index manifest) is fully static at build time. Rather than re-introduce route handlers and dance around the prerender Proxy with `await connection()` / cache headers / `outputFileTracingIncludes`, they're now plain files in `public/` served directly by Next.js. No route handler runs, no Proxy ever wraps the response — the bug surface is removed entirely. While re-architecting, ts-morph was eliminated from the runtime entirely; type extraction now happens in a single build-script pass.

  **User-visible changes**
  - Per-page raw markdown is served at `<page-url>.md` (e.g. `/components/actions/button.md`) — written to `public/<slug>.md` at build time, served by Next.js as a static asset (`Content-Type: text/markdown; charset=UTF-8`). No rewrite, no route handler.
  - The docs page-index manifest is served at `/manifest.json` — written to `public/manifest.json`, served as a static asset (`Content-Type: application/json; charset=UTF-8`). Each entry's `url` field points at the slug-mirror `<page-url>.md` path.
  - `<AutoTypeTable package="system" />` (used by `svg/index.mdx` and `icon/index.mdx`) now produces a populated props table in the markdown output. The previous custom ts-morph plugin only handled `packages/components/src/`, so system-package types silently rendered as empty.
  - `<AppearanceTable>` rendering in markdown now matches the HTML output exactly — they read from the same `@marigold/theme-rui/appearances` map. Four components shift in `<page-url>.md` output as a result: `Menu` gains `destructive` (it lives on the `MenuItem` slot in cva, was missed by the old ts-morph regex), `LinkButton` gains `destructive-ghost` (its `Props` interface omits it but the theme defines it), `Panel.size` gains `default`, `Link.size` gains `default | small`. AppearanceTable description cells render as plain text instead of `inlineCode` — descriptions aren't code.
  - HTML and Markdown prop tables show identical type strings — both go through `autoTypeTableTransform`, so design-system aliases (`Scale | SpacingTokens` etc.) appear consistently. Function types collapse to `function` in markdown the same way they already do in HTML.
  - Dead `resolve-design-tokens` markdown plugin removed: its `<ColorTokenTable>` JSX target was retired with the design-tokens content rewrite, but the plugin still referenced deleted `ui/ColorTable.tsx` / `ui/ColorTokens.tsx` and crashed every markdown build with ENOENT.

  **Architecture**

  ```
  pnpm build (or dev)
    ├─ build:registry      → .registry/demos.{tsx,json}     (unchanged)
    ├─ build:types  NEW    → .registry/props.json           (one ts-morph pass)
    ├─ build:changelog                                       (unchanged)
    ├─ build:manifest      → public/manifest.json           (static asset)
    ├─ build:md            → public/<slug>.md               (static assets)
    └─ next build
  ```

  At request time:
  - `<AutoTypeTable>` (RSC) reads `.registry/props.json` synchronously and renders via fumadocs-ui's `<TypeTable>`. No ts-morph, no async generator, no FS cache lookup per render.
  - `<AppearanceTable>` (RSC) reads `@marigold/theme-rui/appearances` directly (already the existing pattern).
  - `/manifest.json` and `/<slug>.md` are served as static assets from `public/` by Next.js.

  **Internals**
  - `docs/lib/props-data.ts` (NEW) — typed `getPropTable({ path, name, package })` reading from `.registry/props.json`. Single source of truth for both consumers.
  - `docs/scripts/build-types.ts` (NEW) — scans MDX files for `<AutoTypeTable>` references, deduplicates, calls fumadocs-typescript's generator with `autoTypeTableTransform` once per unique tuple, writes `.registry/props.json`. fumadocs FS cache lives at `.registry/.cache/fumadocs-typescript` so subsequent runs are fast when component sources are unchanged: cold ~17s, warm ~0.3s.
  - `docs/scripts/build-md.ts` — writes per-page markdown to `public/<slug>.md`; cleans only `.md` files in slug-root subtrees so existing image / asset directories under `public/` are untouched.
  - `docs/scripts/build-manifest.mjs` — writes the page manifest to `public/manifest.json`.
  - `docs/ui/AutoTypeTable.tsx` — thin wrapper around `fumadocs-typescript/ui`'s `<AutoTypeTable>` with a mock `Generator` that just looks up `.registry/props.json`. The fumadocs `/ui` entry doesn't import ts-morph, so this keeps ts-morph entirely out of the runtime bundle while still using the same `<TypeTable>` shell (collapsibles, hash deep-linking, Shiki).
  - `docs/lib/markdown/plugins/resolve-props-table.ts` — synchronous remark plugin; reads from `.registry/props.json` via `getPropTable`. No more async, no more generator call, no more `pLimit(4)` ts-morph contention in `build-md.ts`.
  - `docs/lib/markdown/plugins/resolve-appearance-table.ts` — drops ts-morph entirely; imports `appearances` from `@marigold/theme-rui/appearances`.
  - `docs/app/manifest.json/route.ts` — deleted (replaced by static asset).
  - `docs/app/api/md/[...slug]/route.ts` — deleted (replaced by static assets).
  - `docs/lib/typescript.ts` — deleted (no longer used at runtime; build-time helpers folded into `scripts/build-types.ts`).
  - `next.config.mjs` — `serverExternalPackages: ['ts-morph', 'typescript']`, the `/<slug>.md → /api/md/<slug>.md` rewrite, and the route-handler `outputFileTracingIncludes` entries are all removed.
  - `ts-morph` moved from runtime dependencies to devDependencies.

  **Performance** (`pnpm build:md` 128 files):

  |                    | before this PR | after |
  | ------------------ | -------------: | ----: |
  | `build:types` cold |              — |  ~17s |
  | `build:types` warm |              — | ~0.3s |
  | `build:md`         |           ~10s |   ~8s |

  `build:types` only reruns ts-morph for source files whose content changed. The registry cache is local-only at `.registry/.cache/fumadocs-typescript/`.

- 774a11a: fix(docs): serve per-page markdown and the page manifest as static assets, eliminate ts-morph from the runtime.

  Backport of the static-files architecture from `beta-release` (PR #5372). On `main`, `app/api/md/[...slug]/route.ts` still uses `force-static` with `generateStaticParams` returning `NextResponse.json(...)`, which is the same pattern that crashes on Vercel under Node ≥22 + Next.js 16:

  ```
  TypeError: Cannot read private member #state from an object whose class did not declare it
      at Reflect.get (<anonymous>)
  ```

  Three things compose into the bug: Node 22+ undici's `Response` uses private class fields (`#state`); Next.js 16's prerender wraps the returned `Response` in a `Proxy`; the Proxy uses `Reflect.get` to forward access, which can't reach private fields declared on a class the receiver isn't an instance of (per the JavaScript spec). See [undici#4290](https://github.com/nodejs/undici/issues/4290), [node#58814](https://github.com/nodejs/node/issues/58814).

  Production has been masked by 10-day-old CDN caches; the next non-trivial redeploy of `main` would have hit the same crash that surfaced on `beta-release`.

  **Fix.** Both endpoints serve fully static data — write it to `public/` at build time and let Next.js serve it directly. No route handler runs, no Proxy ever wraps a `Response`, so the bug surface is removed. While re-architecting, ts-morph was eliminated from the runtime: type extraction now happens once at `pnpm build:types`, writing `.registry/props.json` for both the `<AutoTypeTable>` server component and the markdown-build remark plugin to read.

  **User-visible changes**
  - `/manifest.json` and `/<page-url>.md` (e.g. `/components/actions/button.md`) are now plain static assets in `public/`. No rewrite, no route handler. Same URLs as before.
  - `<AutoTypeTable package="system">` (used by `svg/index.mdx` and `icon/index.mdx`) now produces a populated props table in markdown output. The previous custom ts-morph plugin only handled `packages/components/src/`, so system-package types silently rendered as empty.
  - `<AppearanceTable>` markdown output now matches the HTML output exactly — both read the same `@marigold/theme-rui/appearances` map. Four components shift in their `.md` output: `Menu` gains `destructive`, `LinkButton` gains `destructive-ghost`, `Panel.size` gains `default`, `Link.size` gains `default | small`. AppearanceTable description cells render as plain text instead of `inlineCode`.
  - HTML and markdown prop tables show identical type strings — both go through `autoTypeTableTransform`, so design-system aliases (`Scale | SpacingTokens` etc.) appear consistently.
  - Dead `resolve-design-tokens` markdown plugin removed: it referenced deleted `ui/ColorTable.tsx` / `ui/ColorTokens.tsx` and crashed every markdown build with ENOENT.

  **Architecture**

  ```
  pnpm build (or dev) → pnpm build:assets && next ...

  build:assets (parallel):
  ├─ build:registry   →  .registry/demos.{tsx,json}
  ├─ build:changelog  →  content/.../release.mdx
  ├─ build:manifest   →  public/manifest.json
  └─ build:types  NEW →  .registry/props.json   (one ts-morph pass)
          │
          ▼
      build:md        →  public/<slug>.md
  ```

  ts-morph runs once at build time and is now a `devDependency` only. `<AutoTypeTable>` reads the pre-computed JSON synchronously and renders via fumadocs-ui's `<TypeTable>` shell. See `docs/README.md` for the full script catalog.

- a7a210b: docs(DST-1385): document Switch `variant="settings"` and the auto-save rule

  Adds a Button-style variant table under `## Appearance` summarising `default` and `settings`, rewrites `Settings and preference` with placement guidance and the reasoning for why switches must live on auto-save surfaces (light-switch metaphor + `role="switch"` ARIA contract + save-semantics conflict), and adds a warning Callout reserving `variant="settings"` for auto-save surfaces.

- b5e6e0d: docs(DST-1361): fix column alignment in Table documentation demos. Several demos contradicted the alignment guidelines described in the Table docs (numeric right, text left, center only for icons/status). The action-menu demo centered its row actions with `<Inline alignX="center">` while the column header was left-aligned, and the `table-editable`, `table-links`, and `table-sticky` demos had numeric Rating / Capacity columns rendered left-aligned. The demos now match the documented alignment rules.
- Updated dependencies [5cd5290]
- Updated dependencies [adb8a18]
- Updated dependencies [326f707]
- Updated dependencies [84d3213]
- Updated dependencies [b7c132d]
- Updated dependencies [6587493]
- Updated dependencies [f16b887]
- Updated dependencies [f629319]
- Updated dependencies [93f9ef1]
- Updated dependencies [8326bf7]
- Updated dependencies [bfea9df]
- Updated dependencies [8326bf7]
- Updated dependencies [d35022b]
- Updated dependencies [1cac70d]
- Updated dependencies [968bc0b]
- Updated dependencies [cddcfd3]
- Updated dependencies [e33a1e7]
- Updated dependencies [20a42b0]
- Updated dependencies [00d93c8]
- Updated dependencies [c2a1c72]
- Updated dependencies [326f707]
- Updated dependencies [724f0ce]
- Updated dependencies [62cca29]
- Updated dependencies [8902b10]
- Updated dependencies [de34b15]
- Updated dependencies [04111ca]
  - @marigold/theme-rui@6.0.0-beta.0
  - @marigold/system@18.0.0-beta.0
  - @marigold/components@18.0.0-beta.0
  - @marigold/icons@1.3.39-beta.0

## 17.9.1

### Patch Changes

- Updated dependencies [cd9dd4d]
- Updated dependencies [76fca24]
  - @marigold/theme-rui@5.5.1
  - @marigold/components@17.9.1
  - @marigold/system@17.9.1
  - @marigold/icons@1.3.45

## 17.9.0

### Minor Changes

- 7fc3b53: feat(DST-1446): `marigold search` to find components by docs content

  Adds `marigold search <query>`, which ranks components by matching the query against their docs content (title, description, section headings, and section prose), not just the component name. This collapses the "list → guess → docs → retry" discovery loop (3 to 5 calls) that AI agents run today into a single ranked, snippet-bearing, deep-linked result.

  - **CLI:** new `loadSearchIndex()` / `searchComponentDocs()` library functions and a `search` command wrapping them, with `--limit`, `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache and `sanitizeRemote` — no new dependencies). Scoring weights title ×3, description ×2, each matching heading ×2, and each matching section snippet ×1. Tab completion and telemetry cover the new command. No-match exits 0 (`[]` for `--format json`).
  - **Docs:** `build-manifest.mjs` now also emits `public/component-search.json` — a content index over the component MDX (per-component `headings` plus prose-bearing `{ heading, snippet }` sections, with JSX/imports/code-fences stripped). It is written after `manifest.json` so a content-index bug can never block the manifest that `list`/`docs` depend on.

### Patch Changes

- a912c89: Improve spacing between sidebar navigation sections for better visual separation.
- c5bfbb1: docs(DST-1405): document the Marigold CLI on the docs site

  Adds a new **CLI** page under Getting Started (`/getting-started/cli`). The single page covers installation (npm / pnpm / npx), usage with AI agents, every command (`docs`, `list`, `examples`, `init`, `completion`, `telemetry`) with flags and examples, and configuration (environment variables and per-OS cache / config locations). Content mirrors `packages/cli/README.md`.

  Cross-links were added from the Installation page (`marigold init` as a faster setup path) and the Usage with AI page (the AI-agents section of the new CLI page).

- Updated dependencies [ed2d9ae]
- Updated dependencies [e686474]
- Updated dependencies [2fc7b96]
- Updated dependencies [ed2d9ae]
- Updated dependencies [508ec2c]
- Updated dependencies [24354a9]
- Updated dependencies [4d44517]
  - @marigold/components@17.9.0
  - @marigold/theme-rui@5.5.0
  - @marigold/system@17.9.0
  - @marigold/icons@1.3.44

## 17.8.0

### Patch Changes

- 4a4ab6b: docs(DST-1417): add Responsive Design foundations page

  Documents Marigold's mobile-first breakpoint scale, the `useResponsiveValue` / `useSmallScreen` hooks, and the 320px minimum supported width (a support floor, not a breakpoint). Also adds an "Extra Small Screen (320px)" viewport to Storybook for testing layouts at the floor.

- 7877bc6: feat(DST-1421): `marigold examples` commands to expose application patterns

  Adds `marigold examples list` and `marigold examples get <slug>` so AI agents (and humans) can discover and retrieve Marigold's application-level reference patterns from the terminal, mirroring the library-first architecture of the `docs`/`list` commands.
  - **CLI:** new `listExamples()` / `getExample(slug)` library functions and a `examples` command wrapping them, with `--format markdown|json|plain`, `--fresh` and `--offline` (reusing the existing cache layer). Tab completion and telemetry are extended to cover the new command and example slugs.
  - **Docs:** a new `build-examples.mjs` registry step emits `public/mcp/examples.json` and `public/mcp/examples/<slug>.json` from colocated `*.marigold-pattern.yaml` sidecars. Examples are discovered by sidecar presence (App-Shell placeholder pages are excluded automatically), and a malformed sidecar fails the build. Sidecars ship for the `filter`, `form` and `inventory` examples.
  - A global framework-transformation note (`marigold docs getting-started/examples-for-agents`) documents porting examples from the Next.js App Router to other frameworks (Vite, etc.) once, rather than per example.

- Updated dependencies [bdda185]
- Updated dependencies [a609642]
- Updated dependencies [60b6e03]
  - @marigold/components@17.8.0
  - @marigold/theme-rui@5.4.1
  - @marigold/system@17.8.0
  - @marigold/icons@1.3.43

## 17.7.0

### Patch Changes

- a42a30b: docs(DST-1377): expand "Usage with AI" page with prompting tips, helpers, and limitations

  The "Usage with AI" page now covers three ways to feed Marigold docs to an AI agent (the marigold-docs MCP server, the public `manifest.json` / per-page `.md` endpoints, and the `@marigold/cli`), alongside a new Prompting tips section (the renamed-prop gotcha, naming Marigold, nudging the MCP, referencing component names), a Reservix AI helpers section surfacing rx-ai-suite (`frontend-dev`, `design-system`, `create-marigold-app`), and a Limitations section setting honest expectations plus a Slack feedback footer.

- Updated dependencies [a6a1cb3]
- Updated dependencies [f4608c6]
- Updated dependencies [4242aa1]
- Updated dependencies [da46e58]
- Updated dependencies [e0d5c7b]
  - @marigold/components@17.7.0
  - @marigold/theme-rui@5.4.0
  - @marigold/system@17.7.0
  - @marigold/icons@1.3.42

## 17.6.0

### Minor Changes

- 6b40542: feat(DST-1264): add `@marigold/cli` — terminal access to Marigold docs, component discovery, and project setup.
  - New package `@marigold/cli` with commands:
    - `marigold docs <Component>` — fetch component documentation (supports `--section`, `--format`, `--fresh`, `--offline`)
    - `marigold list` — list available components (supports `--category`, `--search`)
    - `marigold init` — interactive wizard that installs Marigold packages, edits CSS, wraps the app in `Providers`, and patches the Vite config for Next.js and Vite projects
    - `marigold telemetry <status|enable|disable>` — manage anonymous telemetry
    - `marigold completion <bash|zsh|fish>` — print a shell completion script for tab-completing commands, options, and component names
  - Security: sanitize remote content at the fetch boundary to strip the full ECMA-48 escape set (OSC, DCS, APC/PM/SOS, cursor) so a compromised docs origin can't write to the clipboard via OSC 52 or hijack the terminal; the OSC/DCS matchers are linear-time to avoid ReDoS on adversarial input.
  - Docs site: extended `/api/manifest.json` with categorized components and package version; added `/api/telemetry` ingest route (Upstash Redis).
  - CLAUDE.md: documented CLI usage for AI agents.

  The CLI is designed so AI coding agents can fetch accurate Marigold API data from the terminal instead of guessing from training data. Library exports (`getComponentDocs`, `loadManifest`, …) are available for the MCP server to reuse in a later change.

### Patch Changes

- 7ae875a: docs(DST-1430): reframe ToggleButton as an action button, not a form field or filter

  Rewrites the ToggleButton docs to position it as an action button that retains an active state, used in toolbars, editors, and canvases. The page now states explicitly that `<ToggleButton>` is not a form field or a filter, and that `<ToggleButton.Group>` is a toolbar of independent on/off actions rather than a selection control. The filter demo and the "Selection modes" section are removed; their guidance moves into a strengthened Do/Don't list and an updated Alternative components list that points readers to Checkbox.Group, Switch, Tabs, and Button. A new view-options demo broadens the group example beyond the formatting toolbar.

- 8637d9f: docs(DST-982): add a recommended third-party libraries page

  Adds a new "Recommended Libraries" page under Getting Started that collects the third-party libraries we recommend pairing with Marigold in one place. Until now these recommendations were scattered across individual component and pattern docs, so people only found them by chance. The page groups them by purpose (styling & build, data fetching, forms & validation, routing & URL state, dates, testing, and fonts), gives a brief note on when to use each, and links both the library's official docs and our own references. Registered in the Getting Started navigation after Installation.

- a289d42: chore(deps): update react-aria

  Bumps the react-aria packages and `tailwindcss-react-aria-components` (theme-rui).

  Note: following the react-aria update, `Switch` now toggles with the Space key
  to match native checkbox behavior. It no longer toggles on Enter.

- Updated dependencies [6f24f07]
- Updated dependencies [9436cbc]
- Updated dependencies [737c0a9]
- Updated dependencies [c619ffd]
- Updated dependencies [1c5c5fd]
- Updated dependencies [a289d42]
  - @marigold/components@17.6.0
  - @marigold/theme-rui@5.3.2
  - @marigold/system@17.6.0
  - @marigold/icons@1.3.41

## 17.5.1

### Patch Changes

- Updated dependencies [6517e25]
- Updated dependencies [3b29d91]
- Updated dependencies [c65d2a7]
  - @marigold/theme-rui@5.3.1
  - @marigold/components@17.5.1
  - @marigold/system@17.5.1
  - @marigold/icons@1.3.40

## 17.5.0

### Minor Changes

- 6587493: refa([DST-1298]): Refactor Divider component: API, styling, and docs

  We fixed the vertical orientation of the divider, which previously didn't work.
  Added new Divider stories and updated the Divider docs.

- 91f4312: feat: add MCP server for semantic search over Marigold docs

  Adds an MCP (Model Context Protocol) server at `/mcp` that lets AI coding assistants (Claude Code, VS Code Copilot, etc.) semantically search the Marigold documentation. An ETL pipeline (`pnpm build:embeddings`) chunks the MDX docs and generates vector embeddings via AWS Bedrock Titan v2, served via Streamable HTTP transport with Keycloak-authenticated access.

  [DST-1166](https://reservix.atlassian.net/browse/DST-1166)

### Patch Changes

- 727163c: feat([DST-1134]): add `<RangeCalendar>` component (alpha)

  Adds a new `<RangeCalendar>` for selecting a contiguous or non-contiguous date range, built on react-aria's `<RangeCalendar>` with Marigold conventions (`disabled`, `readOnly`, `error`, `dateUnavailable`, `allowsNonContiguousRanges`). Supports up to three side-by-side months via `visibleDuration`, stacking vertically below the `sm` breakpoint; the same responsive stacking now applies to multi-month `<Calendar>` for parity. `description` and `errorMessage` route through `<FieldBase>` so the help/error UI matches the rest of the form-component family (TriangleAlert icon + HelpText container). Ships as an alpha component with a stub docs page under the form section.

  [DST-1134](https://reservix.atlassian.net/browse/DST-1134)

- a69e719: refactor: adopt `Sidebar.Nav` `current` prop in demos and stories

  Replaces the hand-rolled `active={currentPath === '/...'}` pattern across Sidebar and AppLayout demos (documentation) and the `AppLayout` Storybook story with the new `current` prop on `Sidebar.Nav` (shipped in DST-1322 / #5306). The order-detail demo additionally leverages the new prefix-match semantics, so `/orders/:id` routes automatically highlight the `/orders` nav item without a regex fallback.

  No consumer-facing package behavior changes — only demos and an internal story.

- 7aa5128: Add unified demo app at `/examples` that consolidates all pattern demos (filter, form, inventory) alongside a full app-shell example. A shared shell layout renders the sidebar, breadcrumbs, and section switcher from a single navigation tree; each example page links back to its corresponding pattern guidelines. Removes all standalone pattern pages in favor of colocated demo routes.
- 1dbb3e2: fix(docs): make MCP and embedding env vars optional so `pnpm build:docs` works locally without `AWS_BEDROCK_*`, `OIDC_*`, or `BLOB_READ_WRITE_TOKEN` set. Also corrects the `claude mcp add marigold-docs` snippet to use the positional URL argument instead of `--url`.
- 0bf3239: fix: redesign Do/Don't guideline cards to match fumadocs

  Replaces the legacy Do/Don't design with a tinted card layout that uses fumadocs design tokens (`--color-fd-success`/`--color-fd-error`) and `lucide-react` icons. Adds proper dark mode support, which was previously broken due to hardcoded light-mode colors.

  [DST-1348](https://reservix.atlassian.net/browse/DST-1348)

- 8c8e2da: docs(DST-1382): expand Drawer documentation with use cases and decision framework

  Rewrites the Drawer docs to lead with a defining principle (supplementary, in-context, light task; non-modal on desktop), adds a decision framework (Drawer vs Dialog, routing to a page instead), and documents six canonical use cases: detail-row inspection, quick edit/create from a list, filter panel, comments and activity, contextual utility, and multi-field bulk edit. New demos illustrate the table-row inspection, comments/activity, and Table+ActionBar bulk-edit patterns. Filter pattern moved to a `## Related` section.

- c821902: docs([DST-1032]): Revise installation guideline

  Revised the whole installation Guideline, to make it up to date and fix stuff that wasn't working.
  It now contains a more detailed description and has better examples.
  Users and AI should now be able to create a new project with Marigold, without a problem.

- 4b02dfe: feat([DST-1388]): split prop tables into main, aria and handler groups

  The interactive Props table (`<AutoTypeTable>`) on each component page now shows the meaningful API props by default and tucks `aria-*` / `role` attributes and React DOM event handlers into separate collapsible sections (e.g. Button drops from 112 visible props to 39 main + 10 aria + 63 handlers). The static markdown pipeline that feeds the LLM/MCP `search_docs` index is intentionally untouched, so machine-readable docs continue to expose the full prop list.

  [DST-1388](https://reservix.atlassian.net/browse/DST-1388)

- 774a11a: fix(docs): serve per-page markdown and the page manifest as static assets, eliminate ts-morph from the runtime.

  Backport of the static-files architecture from `beta-release` (PR #5372). On `main`, `app/api/md/[...slug]/route.ts` still uses `force-static` with `generateStaticParams` returning `NextResponse.json(...)`, which is the same pattern that crashes on Vercel under Node ≥22 + Next.js 16:

  ```
  TypeError: Cannot read private member #state from an object whose class did not declare it
      at Reflect.get (<anonymous>)
  ```

  Three things compose into the bug: Node 22+ undici's `Response` uses private class fields (`#state`); Next.js 16's prerender wraps the returned `Response` in a `Proxy`; the Proxy uses `Reflect.get` to forward access, which can't reach private fields declared on a class the receiver isn't an instance of (per the JavaScript spec). See [undici#4290](https://github.com/nodejs/undici/issues/4290), [node#58814](https://github.com/nodejs/node/issues/58814).

  Production has been masked by 10-day-old CDN caches; the next non-trivial redeploy of `main` would have hit the same crash that surfaced on `beta-release`.

  **Fix.** Both endpoints serve fully static data — write it to `public/` at build time and let Next.js serve it directly. No route handler runs, no Proxy ever wraps a `Response`, so the bug surface is removed. While re-architecting, ts-morph was eliminated from the runtime: type extraction now happens once at `pnpm build:types`, writing `.registry/props.json` for both the `<AutoTypeTable>` server component and the markdown-build remark plugin to read.

  **User-visible changes**
  - `/manifest.json` and `/<page-url>.md` (e.g. `/components/actions/button.md`) are now plain static assets in `public/`. No rewrite, no route handler. Same URLs as before.
  - `<AutoTypeTable package="system">` (used by `svg/index.mdx` and `icon/index.mdx`) now produces a populated props table in markdown output. The previous custom ts-morph plugin only handled `packages/components/src/`, so system-package types silently rendered as empty.
  - `<AppearanceTable>` markdown output now matches the HTML output exactly — both read the same `@marigold/theme-rui/appearances` map. Four components shift in their `.md` output: `Menu` gains `destructive`, `LinkButton` gains `destructive-ghost`, `Panel.size` gains `default`, `Link.size` gains `default | small`. AppearanceTable description cells render as plain text instead of `inlineCode`.
  - HTML and markdown prop tables show identical type strings — both go through `autoTypeTableTransform`, so design-system aliases (`Scale | SpacingTokens` etc.) appear consistently.
  - Dead `resolve-design-tokens` markdown plugin removed: it referenced deleted `ui/ColorTable.tsx` / `ui/ColorTokens.tsx` and crashed every markdown build with ENOENT.

  **Architecture**

  ```
  pnpm build (or dev) → pnpm build:assets && next ...

  build:assets (parallel):
  ├─ build:registry   →  .registry/demos.{tsx,json}
  ├─ build:changelog  →  content/.../release.mdx
  ├─ build:manifest   →  public/manifest.json
  └─ build:types  NEW →  .registry/props.json   (one ts-morph pass)
          │
          ▼
      build:md        →  public/<slug>.md
  ```

  ts-morph runs once at build time and is now a `devDependency` only. `<AutoTypeTable>` reads the pre-computed JSON synchronously and renders via fumadocs-ui's `<TypeTable>` shell. See `docs/README.md` for the full script catalog.

- b5e6e0d: docs(DST-1361): fix column alignment in Table documentation demos. Several demos contradicted the alignment guidelines described in the Table docs (numeric right, text left, center only for icons/status). The action-menu demo centered its row actions with `<Inline alignX="center">` while the column header was left-aligned, and the `table-editable`, `table-links`, and `table-sticky` demos had numeric Rating / Capacity columns rendered left-aligned. The demos now match the documented alignment rules.
- Updated dependencies [5cd5290]
- Updated dependencies [727163c]
- Updated dependencies [3c6a943]
- Updated dependencies [f8fbef9]
- Updated dependencies [4742e8e]
- Updated dependencies [b7c132d]
- Updated dependencies [6587493]
- Updated dependencies [f16b887]
- Updated dependencies [1cac70d]
- Updated dependencies [5744bbf]
- Updated dependencies [e33a1e7]
- Updated dependencies [c2a1c72]
- Updated dependencies [2ff7bda]
- Updated dependencies [8902b10]
- Updated dependencies [de34b15]
- Updated dependencies [04111ca]
  - @marigold/theme-rui@5.3.0
  - @marigold/components@17.5.0
  - @marigold/system@17.5.0
  - @marigold/icons@1.3.39

## 17.4.0

### Patch Changes

- bb8d67a: Add new "Component Principles" foundations page explaining the four pillars of Marigold's component design: accessibility, theming, composition, and layout.
- 5969186: Replace "Governance Process" and "Governance Principles" pages with a new "How to Contribute" page. Simplify the "Get in touch" page to focus on getting help.
- f02cd1b: docs(DST-975): document component variants under Appearance section
  - Add structured variant description tables (`Variant | Description | When to use`) to 14 component documentation pages: Button, SectionMessage, Badge, Card, Text, Accordion, Toast, Tooltip, Link, LinkButton, Divider, Loader, Menu, and Table
  - Retrofit Table's existing bullet list to the consistent table format
  - Improve Card appearance demo with realistic venue data instead of placeholder content

- 39502d3: bugfix[DST-1300]: Readd missing file field anatomy pic
- d01eb55: Add `/api/manifest.json` route that returns a JSON index of all documentation pages for AI agent discovery.
- fc7578c: Write complete ToggleButton documentation with anatomy diagrams, usage demos (standalone toggle, formatting toolbar, filter toggles, disabled state), Do/Don't guidelines, and alternative components section. Merge ToggleButtonGroup docs into the ToggleButton page.
- Updated dependencies [5dfb6da]
- Updated dependencies [f4f7a05]
- Updated dependencies [bbf0832]
- Updated dependencies [3f77810]
- Updated dependencies [85b2eb0]
- Updated dependencies [d341a9d]
- Updated dependencies [d6507d5]
- Updated dependencies [f560d95]
- Updated dependencies [a4b467f]
- Updated dependencies [50566a2]
- Updated dependencies [203baca]
- Updated dependencies [27d13b7]
- Updated dependencies [49fc2e2]
- Updated dependencies [969c8cc]
  - @marigold/theme-rui@5.2.4
  - @marigold/components@17.4.0
  - @marigold/system@17.4.0
  - @marigold/icons@1.3.38

## 17.3.1

### Patch Changes

- 6b00a16: Move markdown parser and plugins from `app/mcp/` to `lib/markdown/`. Serve markdown at `/{page-path}.md` instead of `/mcp/{page-path}.md`. Remove `build:md-docs` script.
- c8653f3: Unify docs UI component locations: move all components from `docs/components/` into `docs/ui/` and replace local Button/Popover with fumadocs imports.
- Updated dependencies [d3374cd]
  - @marigold/components@17.3.1
  - @marigold/theme-rui@5.2.3
  - @marigold/system@17.3.1
  - @marigold/icons@1.3.37

## 17.3.0

### Patch Changes

- 000ec3d: docs[DST-1193]: Refactor `<Calendar>` documentation.
- Updated dependencies [a48059c]
- Updated dependencies [6a29a6c]
- Updated dependencies [f3068d7]
- Updated dependencies [548dcb4]
  - @marigold/components@17.3.0
  - @marigold/theme-rui@5.2.2
  - @marigold/system@17.3.0
  - @marigold/icons@1.3.36

## 17.2.1

### Patch Changes

- Updated dependencies [fd6f323]
  - @marigold/theme-rui@5.2.1
  - @marigold/system@17.2.1
  - @marigold/components@17.2.1
  - @marigold/icons@1.3.35

## 17.2.0

### Minor Changes

- d44ee55: feat([DST-1163]): Add raw markdown MCP endpoint for documentation pages

  Implements `/mcp/[...slug]` route and `pnpm build:md-docs` that converts all MDX documentation pages to clean Markdown format, enabling programmatic access for AI/LLM integration and external tools.
  The custom remark pipeline processes embedded JSX components (component demos, props tables, design tokens) into semantic Markdown with code blocks and tables.

### Patch Changes

- 9db39f0: fix(DST-1243): Replace DateFormat JSX in changelog build script with plain text dates to fix docs crash
- 096fe67: Improve search result ranking by prioritizing pages whose title matches the query over pages that only mention the query in body text.
- d963df2: chore: Update React Aria to newest version
- Updated dependencies [91eb222]
- Updated dependencies [ed928a0]
- Updated dependencies [cf56729]
- Updated dependencies [5d4c915]
- Updated dependencies [b3c7085]
- Updated dependencies [28eba72]
- Updated dependencies [3019d28]
- Updated dependencies [b61ba43]
- Updated dependencies [e6091b6]
- Updated dependencies [efbd292]
- Updated dependencies [7ca2eb1]
- Updated dependencies [f7870ce]
- Updated dependencies [95c22b6]
- Updated dependencies [a3e3e8e]
- Updated dependencies [4a24ad6]
- Updated dependencies [beebd7c]
- Updated dependencies [9de007c]
- Updated dependencies [ed2baef]
- Updated dependencies [b115fda]
- Updated dependencies [61bfc60]
- Updated dependencies [a715f08]
- Updated dependencies [470d81c]
- Updated dependencies [600d09f]
- Updated dependencies [1ec6788]
- Updated dependencies [c3bf8e4]
- Updated dependencies [f63e57f]
- Updated dependencies [d963df2]
  - @marigold/components@17.2.0
  - @marigold/theme-rui@5.2.0
  - @marigold/system@17.2.0
  - @marigold/icons@1.3.34

## 0.0.3

### Patch Changes

- Updated dependencies [fd1b092]
- Updated dependencies [a3042ed]
  - @marigold/components@17.1.0
  - @marigold/system@17.1.0
  - @marigold/theme-rui@5.1.0
  - @marigold/theme-docs@4.1.2
  - @marigold/icons@1.3.33

## 0.0.2

### Patch Changes

- Updated dependencies [fb32888]
  - @marigold/theme-rui@5.0.1
  - @marigold/system@17.0.1
  - @marigold/components@17.0.1
  - @marigold/icons@1.3.32
  - @marigold/theme-docs@4.1.1

## 0.0.1

### Patch Changes

- b8bab20: docs([DST-1201]): Fix AppearanceDemo Select
- Updated dependencies [d8ce791]
- Updated dependencies [34c785a]
- Updated dependencies [96e145a]
- Updated dependencies [196172e]
- Updated dependencies [f756051]
- Updated dependencies [2e3f7d2]
- Updated dependencies [cfa9b99]
- Updated dependencies [00a3c81]
- Updated dependencies [cc61968]
- Updated dependencies [01e6bdb]
- Updated dependencies [2244030]
- Updated dependencies [6c071f0]
- Updated dependencies [44d01a6]
- Updated dependencies [63f1603]
- Updated dependencies [a0564dc]
- Updated dependencies [282b330]
- Updated dependencies [7928a23]
- Updated dependencies [5a90757]
- Updated dependencies [0c00d1d]
- Updated dependencies [0c00d1d]
- Updated dependencies [4645c5d]
- Updated dependencies [59ed05f]
- Updated dependencies [8dd0455]
- Updated dependencies [1469268]
- Updated dependencies [196172e]
- Updated dependencies [31a4e38]
- Updated dependencies [f916a20]
- Updated dependencies [726239d]
- Updated dependencies [1bd9f27]
- Updated dependencies [b8bab20]
- Updated dependencies [b7c64cc]
- Updated dependencies [8a70185]
  - @marigold/components@17.0.0
  - @marigold/theme-rui@5.0.0
  - @marigold/system@17.0.0
  - @marigold/theme-docs@4.1.0
  - @marigold/icons@1.3.31
