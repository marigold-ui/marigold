# DST-1257 — Naming Research

Research for the new "page-level content sectioning" component
([DST-1257](https://reservix.atlassian.net/browse/DST-1257)).

## Context

The component is a **page-level structured section** with a compound API:

- `Header` / `Title` / `Description` / `Actions` / `Content` / `Collapsible` / `Footer`
- Variants: `default | master | admin | danger`
- Raised elevation
- Explicitly **not** a collection item — that role stays with the existing `Card`

The naming friction is that "Card" is the most natural English word for "elevated
rectangle with a header", but it is already taken in Marigold for collection items.

## How other design systems handle this

### Systems with a single overloaded `Card`

These ship one component that does both jobs; users decide via context.

| System                                                                                                               | Component        | Slots / sub-parts                                                                       | Variants                   |
| -------------------------------------------------------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------- | -------------------------- |
| [Material Design 3](https://m3.material.io/components/cards/specs)                                                   | `Card`           | header / body / footer                                                                  | elevated, filled, outlined |
| [Ant Design](https://ant.design/components/card/)                                                                    | `Card`           | `title`, `extra`, `actions`, `cover`, `Card.Meta`, `tabList`                            | bordered, borderless       |
| [Microsoft Fluent UI](https://fluent2.microsoft.design/components/web/react/core/card/usage)                         | `Card`           | `CardPreview`, `CardHeader` (image / header / description), `CardFooter`                | —                          |
| [Salesforce SLDS](https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/lightning-card) | `lightning-card` | title / body / footer / actions / icon                                                  | —                          |
| [shadcn/ui](https://ui.shadcn.com/docs/components/card)                                                              | `Card`           | `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` | size `sm`                  |
| [Workday Canvas](https://canvas.workday.com/components/containers/card)                                              | `Card`           | `Card.Heading`, `Card.Body`                                                             | borderless                 |

### Systems that split into two named components

These force intent at the API level — the closest precedent for what DST-1257 wants.

| System                                                                                    | Page-section component                                                                                                         | Collection item                                                         | Notes                                                                                                                                                             |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [PatternFly (Red Hat)](https://www.patternfly.org/components/panel/)                      | **`Panel`**                                                                                                                    | [`Card`](https://www.patternfly.org/components/card/design-guidelines/) | Direct precedent. Panel = "customizable container for flexible content layouts" with header / body / footer. Card = dashboards / grids / catalog views.           |
| [GitLab Pajamas](https://design.gitlab.com/product-foundations/layout/)                   | **`Section`** (+ [`Dashboard Panel`](https://design.gitlab.com/components/dashboard-panel/))                                   | [`Card`](https://design.gitlab.com/components/)                         | Section = "complete content enclosures, visually distinct from panel background, for major content areas with clear boundaries". Almost word-for-word the ticket. |
| [Adobe Spectrum / RAC](https://react-spectrum.adobe.com/Card)                             | `Card` (slotted)                                                                                                               | [`CardView`](https://react-spectrum.adobe.com/CardView)                 | Splits identity from collection. The "Card + CardView" path.                                                                                                      |
| [Shopify Polaris](https://polaris-react.shopify.com/components/layout-and-structure/card) | `Card` (with internal sections) + [`Layout.Section`](https://polaris-react.shopify.com/components/layout-and-structure/layout) | same `Card`                                                             | Card sections nest _inside_ Card; Layout.Section is page-level structure.                                                                                         |

### Systems built on composable primitives

One low-level surface, one higher-level structured wrapper.

| System                                                              | Primitive             | Structured wrapper                          | Notes                                                                                           |
| ------------------------------------------------------------------- | --------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [AWS Cloudscape](https://cloudscape.design/components/container/)   | `Container`           | composed with `Header` (separate component) | Header is its own component, used wherever (Form, Container, Table). Composition over compound. |
| [Mantine](https://mantine.dev/core/paper/)                          | `Paper`               | [`Card`](https://mantine.dev/core/card/)    | Paper = visual primitive; Card wraps Paper and adds `Card.Section`.                             |
| [IBM Carbon](https://carbondesignsystem.com/components/tile/usage/) | `Tile` (no elevation) | `Card` (built on Tile)                      | Tile variations: base, clickable, selectable, expandable. **Tile has no elevation by design.**  |

### Niche / historical names

| System                                                                                | Component                                                          | Notes                                                                       |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| [Zendesk Garden](https://garden.zendesk.com/components/well/)                         | `Well`                                                             | Groups related content. Old Bootstrap heritage. Optional `floating` shadow. |
| [GitHub Primer](https://primer.style/product/getting-started/foundations/layout/)     | `PageLayout.Pane`                                                  | Implies split-layout / IDE pane, not page sectioning.                       |
| [Apple HIG / SwiftUI](https://developer.apple.com/design/human-interface-guidelines/) | `Form { Section { … } }`, "Inset Grouped" tables                   | `Section` is the universal iOS term for grouped page parts.                 |
| [Vercel Geist (community)](https://vercel.com/geist/introduction)                     | `Card`, `Fieldset`                                                 | `Fieldset` for panel-like settings sections.                                |
| [Atlassian](https://atlassian.design/components/primitives/box/)                      | `Box` primitive (no dedicated section component); `Panel` = drawer | No first-class sectioning component.                                        |

## Architectural patterns

Three ways the industry solves this problem:

1. **Single overloaded component** (Material, Ant, Fluent, Salesforce, shadcn, Workday).
   Simple, but produces exactly the ambiguity the ticket calls out.
2. **Two named components** (PatternFly, Pajamas, Spectrum, Polaris).
   Forces intent at the API level. Closest precedent for the ticket.
3. **Composable primitives** (Cloudscape, Mantine, Carbon).
   One low-level surface, one structured wrapper. Marigold already partly leans
   this way (existing `Card` could be the primitive).

## Names actually used for "structured page section, not a collection item"

- **`Panel`** — PatternFly, GOV.UK, jQuery UI, Bootstrap (legacy)
- **`Section`** — GitLab Pajamas, Apple HIG, Polaris (`Layout.Section`), HTML `<section>`
- **`Container`** — AWS Cloudscape
- **`Well`** — Zendesk Garden, Bootstrap heritage
- **`Tile`** — IBM Carbon (but no elevation)
- **`Paper`** / **`Surface`** — Mantine, Material, Fluent (primitives)
- **`Fieldset`** — HTML, Geist
- **`Pane`** — GitHub Primer (split layouts)
- **`Group`** / **`InsetGroup`** — Apple HIG SwiftUI
- **`PageSection`** — PatternFly internal layout slot

## Candidate shortlist

| Candidate                                  | Industry precedent                                                 | Fit        | Why / why not                                                                                                                                                                                                                                                                     |
| ------------------------------------------ | ------------------------------------------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Panel`**                                | PatternFly (exact match), GOV.UK, jQuery UI                        | ⭐⭐⭐⭐⭐ | Direct precedent for "Card-like but for layout, not collection" in an enterprise B2B context. PatternFly documents the same Card-vs-Panel distinction. The "drawer/sliding" connotation is mostly an Atlassian-local convention, mitigated since Marigold already ships `Drawer`. |
| **`Section`**                              | GitLab Pajamas (exact match), Polaris, Apple HIG, HTML `<section>` | ⭐⭐⭐⭐⭐ | Strongest semantic match. Pajamas's definition is almost word-for-word the ticket. Maps cleanly to ARIA / HTML. Risk: word-overload in conversation and docs ("a Section contains sections of content").                                                                          |
| **`Card` + rename existing to `CardView`** | Adobe Spectrum, RAC                                                | ⭐⭐⭐⭐   | The "right" long-term answer. Aligns with RAC vocabulary. Pulls [DST-1162](https://reservix.atlassian.net/browse/DST-1162) into scope and is a breaking rename.                                                                                                                   |
| **`Container`**                            | AWS Cloudscape                                                     | ⭐⭐⭐     | Real component name at AWS. Loses meaning if Marigold also has layout containers.                                                                                                                                                                                                 |
| **`PageSection`**                          | PatternFly internal                                                | ⭐⭐⭐     | Maximally explicit, unambiguous. Verbose; sub-components get long (`PageSection.Collapsible`).                                                                                                                                                                                    |
| **`Group`** / **`InsetGroup`**             | Apple HIG SwiftUI                                                  | ⭐⭐⭐     | Strong iOS precedent. Risk: `Group` is taken in many libraries for ARIA roles or input grouping.                                                                                                                                                                                  |
| **`Well`**                                 | Zendesk Garden, Bootstrap                                          | ⭐⭐       | Distinct, but obscure today; Bootstrap deprecated it.                                                                                                                                                                                                                             |
| **`Tile`**                                 | IBM Carbon, deprecated PatternFly                                  | ⭐⭐       | Carbon explicitly says tiles have no elevation — wrong fit for raised surfaces.                                                                                                                                                                                                   |
| **`Paper`** / **`Surface`**                | Mantine, Material, Fluent                                          | ⭐⭐       | These are _primitives_, not structured compound components. Wrong abstraction level.                                                                                                                                                                                              |
| **`Pane`**                                 | GitHub Primer                                                      | ⭐⭐       | Implies split-layout / IDE pane, not page sectioning.                                                                                                                                                                                                                             |
| **`Fieldset`**                             | HTML, Geist                                                        | ⭐⭐       | Form-specific connotation; ticket scope is broader than forms.                                                                                                                                                                                                                    |

## Recommendation

The strongest evidence-backed picks are **`Panel`** and **`Section`**.

- **`Panel`** is the most-aligned name with intent. PatternFly is a direct precedent
  for the same distinction in a Red Hat enterprise B2B context (close domain analog
  to a ticketing admin UI). The "drawer/sliding panel" objection is weaker than it
  first appears: PatternFly, GOV.UK, and Bootstrap all use `Panel` for static
  surfaces — the slide-in meaning is largely Atlassian-local convention.

- **`Section`** is the most-aligned name with semantics. GitLab Pajamas defines it
  almost identically to the ticket, Polaris uses it at the page level, and Apple HIG
  uses `Section` as the universal term for grouped page parts. The HTML `<section>`
  mapping is a real accessibility win. The downside (word overload) is real but
  manageable with consistent capitalization in docs.

- **`Card` + `CardView`** stays the "right answer" if the team is willing to absorb
  [DST-1162](https://reservix.atlassian.net/browse/DST-1162) into this work.

**Tie-breaker:** `Panel` edges out `Section` for two reasons:

1. PatternFly is a closer domain analog to a B2B ticketing admin UI than GitLab is.
2. `Panel` isn't a reserved English word for "any part of a page", so it survives
   the docs-readability test better than `Section`.

## Sources

- [PatternFly Card](https://www.patternfly.org/components/card/design-guidelines/) · [PatternFly Panel](https://www.patternfly.org/components/panel/)
- [GitLab Pajamas Components](https://design.gitlab.com/components/) · [GitLab Pajamas Layout / Sections](https://design.gitlab.com/product-foundations/layout/) · [GitLab Dashboard Panel](https://design.gitlab.com/components/dashboard-panel/)
- [AWS Cloudscape Container](https://cloudscape.design/components/container/)
- [IBM Carbon Tile](https://carbondesignsystem.com/components/tile/usage/)
- [Salesforce SLDS Card (LWC)](https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/lightning-card)
- [Microsoft Fluent UI Card](https://fluent2.microsoft.design/components/web/react/core/card/usage)
- [Workday Canvas Card](https://canvas.workday.com/components/containers/card) · [Workday Expandable Container](https://canvas.workday.com/components/containers/expandable-container)
- [Mantine Paper](https://mantine.dev/core/paper/) · [Mantine Card](https://mantine.dev/core/card/)
- [Material Design 3 Cards](https://m3.material.io/components/cards/specs)
- [Ant Design Card](https://ant.design/components/card/)
- [shadcn/ui Card](https://ui.shadcn.com/docs/components/card)
- [Zendesk Garden Well](https://garden.zendesk.com/components/well/)
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)
- [Adobe Spectrum Card](https://react-spectrum.adobe.com/Card) · [Adobe Spectrum CardView](https://react-spectrum.adobe.com/CardView)
- [Shopify Polaris Card](https://polaris-react.shopify.com/components/layout-and-structure/card) · [Polaris Layout](https://polaris-react.shopify.com/components/layout-and-structure/layout)
- [GitHub Primer PageLayout](https://primer.style/product/getting-started/foundations/layout/)
- [Atlassian Box primitive](https://atlassian.design/components/primitives/box/)
- [Vercel Geist](https://vercel.com/geist/introduction)
