# Token Improvement Plan

A prioritized, critically examined plan for improving Marigold's design token architecture. Each suggestion includes the rationale, counter-arguments, and expected benefit.

---

## Overview: Current State Summary

Marigold's theme-rui defines ~45 color tokens, ~20 spacing tokens, 3 elevation tokens, 1 radius token, 18 easing functions, and several animation tokens inside `@theme static` blocks. Component styles consume these via `cva()` functions using Tailwind utility classes.

**What works well:**

- The `cva()` component style system is solid and already serves as the "component token" layer
- The `ui-*` utility composition layer (ui-surface, ui-state-focus, etc.) is well-designed
- The relational spacing system (joined/tight/related/peer/group/section/context) is semantically clear
- The inset spacing system (square/squish/stretch) is well-structured
- The elevation system (border/raised/overlay) is the right level of granularity
- Z-index management in components (not theme) is intentional and correct

**What needs improvement:**

- No shared token contract between themes
- Naming inconsistencies within theme-rui
- Identical values for semantically distinct states (hover = selected = focus = muted)
- Legacy tokens still present
- No radius token system (only 1 token, everything else is hardcoded)
- No primitive token layer (semantic tokens reference Tailwind scales directly)
- 18 easing functions defined, only 4 used
- No surface hierarchy (everything is white)
- Orange palette too saturated in light tones

---

## Phase 1: Quick Wins (Low Risk, High Impact)

### 1.1 Differentiate hover and selected states

**Change:** `--color-selected: var(--color-stone-100)` to `--color-selected: var(--color-stone-200)`

**Benefit:** Users can visually distinguish hover from selected in ListBox, Select, ComboBox, Calendar. Currently impossible — both are stone-100. This single token change propagates to all list components through existing `bg-selected` / `bg-hover` classes.

**Counter-question: Won't stone-200 clash with `--color-disabled` (also stone-200)?**

Yes, disabled is also stone-200. But disabled items also have `text-disabled-foreground` (stone-500), `cursor-not-allowed`, and reduced interactivity — the context differs enough. The visual overlap between selected and disabled backgrounds is acceptable because they never appear on the same element simultaneously. A selected item cannot be disabled; a disabled item cannot be selected.

**Counter-question: Is the stone-100 to stone-200 difference perceptible enough?**

On white backgrounds, yes. stone-100 is `#f5f5f4` (L*=96.5), stone-200 is `#e7e5e4` (L*=91.6). That's a ~5 point L\* difference, which is clearly visible when adjacent items use different values (one hovered, one selected). Industry precedent: Radix uses exactly this pattern (step 3 for hover, step 4/5 for selected).

**Effort:** 1 token change in theme.css. Zero component changes needed.

### 1.2 Remove legacy surface tokens

**Change:** Delete `--surface-sunken`, `--surface-sunken-shadow`, `--surface-body`, `--surface-body-shadow`, `--surface-raised`, `--surface-raised-shadow`, `--surface-raised-border`, `--surface-overlay`, `--surface-overlay-shadow`, `--surface-overlay-border` from theme.css. Delete `util-surface-sunken`, `util-surface-body`, `util-surface-raised`, `util-surface-overlay` from utils.css.

**Benefit:** Eliminates confusion about which elevation system to use. The new `--shadow-elevation-*` system supersedes these. Removes ~25 lines of dead/deprecated CSS.

**Counter-question: Are these legacy utilities used anywhere?**

Grep shows they're only referenced in `fumadocs/content/foundations/elevation/` demo files — documentation examples, not production components. The demo files need to be updated to use the new elevation tokens, but no production code breaks.

**Counter-question: Should we keep them as backwards-compatible aliases?**

No. They're internal to our theme, not public API. The comment says "OLD (to be removed when updating docs)" — the intent is clear. Keeping dead tokens creates confusion for new contributors about which system to use.

**Effort:** Delete tokens from theme.css, delete utilities from utils.css, update ~5 fumadocs demo files.

### 1.3 Consolidate easing functions

**Change:** Remove unused easing functions. Keep only the 4 that are actually used:

| Token              | Used By                                                  |
| ------------------ | -------------------------------------------------------- |
| `--ease-out-quad`  | Scrollbar transition (ui.css)                            |
| `--ease-out-cubic` | fade-in-up animation (theme.css)                         |
| `--ease-out-quart` | slide-in/slide-out ActionBar (theme.css)                 |
| `--ease-out-expo`  | Directional slide animations for Drawer/Tray (theme.css) |
| `--ease-out-quint` | Switch thumb transition (Switch.styles.ts)               |

All 6 `ease-in-*` and all 6 `ease-in-out-*` functions are unused by any component style or animation definition. The entire ease-in family is unused.

**Benefit:** Reduces token surface area from 18 easing functions to 5. Developers don't have to choose from 18 near-identical options. The 5 remaining easings cover all actual use cases: subtle (quad), standard (cubic), snappy (quart), dramatic (expo), and smooth (quint).

**Counter-question: What if a future animation needs ease-in or ease-in-out?**

Then we add it when needed. CSS also has built-in `ease-in`, `ease-in-out`, and `ease` keywords that work without tokens. The cost of adding a token later is negligible; the cost of maintaining 13 unused tokens is documentation confusion and decision paralysis.

**Counter-question: Should we rename them to semantic names (e.g., `--ease-standard`, `--ease-dramatic`)?**

Tempting, but the current mathematical names (quad, cubic, etc.) are precise and well-understood. Semantic names add an abstraction that doesn't map well — "standard" for one theme might be "dramatic" for another. Keep the mathematical names.

**Effort:** Delete 13 CSS custom properties from theme.css. No component changes needed.

---

## Phase 2: Structural Improvements (Medium Effort, High Value)

### 2.1 Establish a shared token contract (naming convention)

**Change:** Define a canonical set of semantic token names that both theme-rui and theme-docs must implement. This is a **naming convention decision** first, then a migration.

The proposed contract maps context into the token name to eliminate ambiguity:

```css
/* Text */
--color-text-primary       /* currently --color-foreground */
--color-text-secondary     /* currently --color-muted-foreground */
--color-text-disabled      /* currently --color-disabled-foreground */
--color-text-inverse       /* currently --color-brand-foreground */
--color-text-placeholder   /* currently --color-placeholder */
--color-text-link          /* currently --color-link */

/* Backgrounds */
--color-bg-body            /* currently --color-background */
--color-bg-surface         /* currently --color-surface */
--color-bg-surface-sunken  /* NEW: var(--color-stone-50), for inset areas */
--color-bg-muted           /* currently --color-muted */
--color-bg-disabled        /* currently --color-disabled */
--color-bg-overlay         /* implicit in current system */

/* Brand */
--color-bg-brand           /* currently --color-brand */
--color-text-on-brand      /* currently --color-brand-foreground */

/* Interactive states */
--color-bg-hover           /* currently --color-hover */
--color-text-hover         /* currently --color-hover-foreground */
--color-bg-selected        /* currently --color-selected */
--color-bg-focus           /* currently --color-focus */

/* Borders */
--color-border-default     /* currently --color-border */
--color-border-input       /* currently --color-input */
--color-border-surface     /* currently --color-surface-border */
--color-border-ring        /* currently --color-ring */

/* Status (keep 4-part pattern, add bg/text context) */
--color-bg-error           /* currently --color-destructive */
--color-text-on-error      /* currently --color-destructive-foreground */
--color-bg-error-muted     /* currently --color-destructive-muted */
--color-text-error-muted   /* currently --color-destructive-muted-foreground */
--color-border-error-muted /* currently --color-destructive-muted-accent */
/* ...same pattern for success, warning, info */
```

**Benefit:** Component style files can be written once and work across themes. Adding a new theme requires only defining the token values, not rewriting all component styles. The `bg-`/`text-` context prefixes eliminate the Tailwind double-prefix problem (`bg-background` becomes `bg-bg-body`, or we use short aliases).

**Counter-question: Is the `bg-bg-body` double-prefix problem worse than the current `bg-background` one?**

Good point. The convention `--color-bg-body` produces `bg-bg-body` in Tailwind, which is indeed ugly. Alternative approaches:

1. **Drop the `color-` prefix**: `--bg-body`, `--text-primary` — but Tailwind v4 namespaces all color tokens under `--color-*` in `@theme`.
2. **Use shorter context**: `--color-body`, `--color-surface`, `--color-on-brand` — but this is what we already have and it's ambiguous about which CSS property the token targets.
3. **Accept the double-prefix**: `bg-bg-body` is ugly but unambiguous. The `ui-*` utility layer already abstracts most of this away.
4. **Use Tailwind v4 custom `@theme` namespaces**: Map tokens into purpose-specific namespaces.

**Recommendation:** Investigate option 4 first. If Tailwind v4 can map `--color-bg-body` to a `bg-body` utility (without the double `bg-`), that's the cleanest path. If not, option 2 (current style with better consistency) is pragmatically the best choice. The naming convention can be decided during implementation — the important thing is that both themes agree on the same names.

**Counter-question: Is this actually worth the churn?**

This is the most disruptive change in the plan. Every component style file needs updating. But the alternative is that every new theme requires duplicating all ~50 component style files. The churn is O(n) once; the ongoing cost of no contract is O(n\*m) for n components and m themes. Worth it if the team plans more than 2 themes (or wants to share component styles with external consumers).

**If the team has no plans for additional themes**, this drops to lower priority. The naming inconsistency within theme-rui is annoying but not blocking.

**Effort:** High. Requires updating theme.css, all ~50 component style files in theme-rui, all in theme-docs, and the ui.css/utils.css utility layer. Can be done incrementally with temporary aliases.

### 2.2 Add semantic radius tokens

**Change:** Add 3-4 semantic radius tokens:

```css
--radius-sm: var(--radius-sm); /* small: badges, chips, tabs, list items */
--radius-md: var(--radius-md); /* medium: inputs, buttons, cards */
--radius-lg: var(--radius-lg); /* large: dialogs, drawers */
--radius-full: 9999px; /* pills: switches, radio buttons, avatars */
```

Then migrate hardcoded `rounded-*` values in component styles to use semantic tokens. Current inventory of hardcoded radius values across ~30 component style files:

| Class             | Used in                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `rounded-full`    | Switch, Badge, Radio, Tray handle, CloseButton, ContextualHelp, Slider thumb, ActionBar                     |
| `rounded-md`      | ListBox items, Calendar cells, Card, SectionMessage, Accordion, Tooltip, Tag, Collapsible, Multiselect chip |
| `rounded-lg`      | Calendar cells (some), Multiselect container, Slider track, Table action bar                                |
| `rounded-xl`      | Dialog, FileField, Drawer                                                                                   |
| `rounded-sm`      | Tabs                                                                                                        |
| `rounded-surface` | Applied via `ui-surface`, `ui-surface-contrast`, `ui-button-base` (resolves to `--radius-lg`)               |

**Benefit:** A theme that wants sharp corners or fully rounded elements changes 4 tokens instead of editing 30+ component style files. The current `--radius-surface` is a good start but only covers the `ui-surface` utility — everything else is hardcoded.

**Counter-question: Aren't the specific radius values intentional per-component? A Badge should always be `rounded-full`, a Dialog should always be `rounded-xl`.**

Partially true. `rounded-full` for switches and radio buttons IS functionally required (they're circles). But whether a Dialog uses `rounded-xl` vs `rounded-lg` is a design decision that should be themeable. The semantic tokens can have sensible defaults while still allowing per-theme override.

**Proposed mapping:**

- `rounded-full` stays as-is for elements that must be circular (Switch, Radio, Badge, Avatar)
- `rounded-md` and `rounded-lg` → use `rounded-component` (new semantic token for component-level rounding)
- `rounded-xl` → use `rounded-surface` (existing token, already `var(--radius-lg)`)

**Counter-question: Does adding these tokens actually help? We'd still have hardcoded `rounded-full` in many places.**

The gain is partial: ~60% of radius usage becomes themeable. The `rounded-full` cases are inherently un-themeable (a circle is a circle). But the remaining 40% — the difference between `rounded-md` vs `rounded-lg` for list items, cards, sections — is where theme personality lives. That's worth tokenizing.

**Effort:** Medium. Define tokens, then search-and-replace across component styles. Non-breaking — old values can be migrated incrementally.

### 2.3 Add a surface-sunken token

**Change:** Add `--color-surface-sunken: var(--color-stone-50)` for inset/recessed areas.

**Benefit:** Provides a third background level between white and stone-100 (muted) for code blocks, sidebar backgrounds, table wells, and inset areas. Currently everything is white except muted (stone-100), which is also used for hover/focus states — overloaded.

The hierarchy becomes:

```
white (bg-body)    → primary content, cards, overlays
stone-50 (sunken)  → inset areas, sidebars, code blocks  ← NEW
stone-100 (muted)  → hover state, readonly, muted areas
stone-200           → selected state, disabled, borders
```

**Counter-question: Is stone-50 (#fafaf9) even perceptible against white (#ffffff)?**

Barely, in isolation. But when used as a background for a full section (sidebar, code block), the adjacent white creates enough contrast to register. Radix uses the same principle (step 2 at similar lightness). If stone-50 proves too subtle, the token can be remapped to stone-100 without changing any component code — that's the point of tokens.

**Counter-question: Does this create a collision with `--color-secondary` (stone-50)?**

Yes, `--color-secondary` is also `stone-50`. This is actually fine — they serve the same visual purpose (a slightly off-white background). If the naming convention work (2.1) happens, `--color-secondary` may be renamed or merged into surface-sunken. Until then, both can coexist.

**Effort:** Low. Add 1 token. Components that want to use it can adopt it incrementally.

---

## Phase 3: Quality Improvements (Medium Risk, Long-Term Value)

### 3.1 Add a primitive token layer

**Change:** Define a thin primitive/reference layer between Tailwind's built-in scales and the semantic tokens:

```css
/* Primitives — the palette of this theme */
--primitive-neutral-50: var(--color-stone-50);
--primitive-neutral-100: var(--color-stone-100);
/* ...through 950 */
--primitive-accent-50: var(--color-orange-50);
/* ...through 950 */
--primitive-error: var(--color-red-600);
--primitive-success: var(--color-green-500);
--primitive-warning: var(--color-yellow-400);
--primitive-info: var(--color-blue-500);

/* Semantic tokens reference primitives */
--color-background: var(
  --primitive-neutral-white
); /* was: var(--color-white) */
--color-foreground: var(
  --primitive-neutral-950
); /* was: var(--color-stone-950) */
--color-brand: var(--primitive-neutral-950); /* was: var(--color-stone-950) */
```

**Benefit:** Changing the neutral palette from "stone" to "slate" or "zinc" requires updating ~11 primitive mappings instead of ~30 semantic token definitions. Makes the palette choice explicit and centralized.

**Counter-question: Is this just adding indirection for the sake of architecture?**

If Marigold will only ever use the stone palette, yes — it's unnecessary indirection. The value materializes when: (a) a new theme uses a different neutral palette, (b) the team decides to switch from stone to zinc, (c) someone wants to quickly evaluate "what would this look like with a cool gray?"

**Counter-question: Don't the semantic tokens already serve as the abstraction layer?**

They do for components. But within theme.css itself, there's no abstraction over the palette choice. 30+ tokens say `var(--color-stone-*)`. The primitive layer is an internal refactoring of theme.css, not something components ever see.

**Counter-question: The research says "don't create a 3-tier system." Isn't this a 3rd tier?**

No. The 3 tiers are: (1) primitive, (2) semantic, (3) component. We already have tiers 2 and 3 (semantic tokens + cva component styles). This adds tier 1. The research says don't add tier 3 ON TOP of the existing system — we already have it. Tier 1 (primitives) is the missing foundation.

**Effort:** Medium. Internal refactoring of theme.css. No component changes needed. Can be done as a standalone PR.

### 3.2 Optimize the orange palette

**Change:** Reduce chroma in orange-50 through orange-200, keep 500-950 close to current. Design in OKLCH, ship as hex.

Proposed values (from research doc 10):

```css
--color-orange-50: #fdf8f3; /* was #fff9ed — less yellow, more neutral-warm */
--color-orange-100: #f9efe3; /* was #fff1d5 — cooler, more stone-adjacent */
--color-orange-200: #f2ddc5; /* was #fedfaa — less saturated */
--color-orange-300: #e5bd8a; /* was #fdc774 */
--color-orange-400: #d49a55; /* was #fba43c */
--color-orange-500: #c5812f; /* was #f98e22 */
--color-orange-600: #ad6520; /* was #ea6d0c */
--color-orange-700: #8e4f1c; /* was #c2520c */
--color-orange-800: #714019; /* was #9a4112 */
--color-orange-900: #5a3317; /* was #7c3712 */
--color-orange-950: #3a1f0f; /* was #431a07 */
```

**Benefit:** The pale orange tones (50-200) shift from "yellow highlighter" to "warm neutral" — usable as subtle accent backgrounds alongside stone without clashing. The peak chroma drops from 0.183 to 0.155, making the mid-tones feel "refined amber" instead of "traffic cone."

**Counter-question: Is the orange palette even used enough to justify this work?**

Currently only used for `access-master` marks (orange-100 bg, orange-500 text). But the comment says "use for accent" — the intent is broader usage. If orange will be used for accent highlights, active states, or data visualization, the palette quality matters. Even for the current access-master use, the change improves the appearance.

**Counter-question: Does this require brand sign-off?**

Yes. This is a visual change to brand-adjacent colors. The technical analysis informs the conversation, but the final values need design approval. Present as "optimized for digital use" — the palette is tuned for screen rendering, not changed in character.

**Counter-question: Should we use OKLCH syntax directly in CSS?**

Browser support is excellent (94%+), but hex is universally supported. Since we're in a Tailwind `@theme static` block, hex is simpler and more compatible. Design in OKLCH (for perceptual accuracy), ship as hex.

**Effort:** Low code change (11 hex values). High design effort (requires visual testing and sign-off).

### 3.3 Fix the `@source inline` inconsistency

**Change:** Audit `styles.css` `@source inline(...)` declarations against actual token names in `theme.css`. Fix any mismatches.

**Background:** `@theme static` prevents Tailwind from auto-generating utility classes. The `@source inline(...)` blocks in `styles.css` tell Tailwind which classes to generate. These are manually maintained and have known inconsistencies — e.g., spacing names in `@source inline` may not match token names in `theme.css`.

**Benefit:** Eliminates silent failures where a Tailwind class derived from a token produces no CSS because the inline source declaration uses a different name.

**Counter-question: Should we just switch from `@theme static` to `@theme`?**

If we switch to `@theme` (non-static), Tailwind auto-generates utilities for ALL tokens — including ones we may not want as utilities (animation definitions, internal primitives). `@theme static` gives us control over which tokens become utilities. The manual `@source inline` maintenance is the tradeoff. Worth evaluating whether the maintenance burden exceeds the benefit of selective generation.

**Effort:** Low. Audit and fix string values. Can be done in one PR.

---

## Phase 4: Advanced Improvements (Higher Effort, Longer Term)

### 4.1 TypeScript token types (build-time safety)

**Change:** Create a build script that parses `theme.css` and generates TypeScript types for token names.

```ts
// Auto-generated from theme.css
export type ColorToken =
  | 'background' | 'foreground' | 'brand' | 'brand-foreground'
  | 'hover' | 'hover-foreground'
  | /* ... */;

export type SpacingToken =
  | 'joined' | 'tight' | 'related' | 'peer' | 'group' | 'section' | 'context'
  | /* ... */;
```

**Benefit:** Catch typos like `bg-brand-foregound` at build time instead of silently missing styles in production.

**Counter-question: Tailwind v4 with IntelliSense already catches most typos via autocomplete. Is build-time checking redundant?**

IntelliSense helps during authoring but doesn't prevent incorrect values from being committed. A CI check that validates token usage catches regressions that IntelliSense misses (bulk renames, copy-paste errors, merges). The value depends on how often token typos actually cause production bugs.

**Counter-question: Is maintaining a custom build script worth it?**

If typos are rare in practice, the maintenance cost exceeds the benefit. If the team has been bitten by silent style failures, this becomes high-value. Start by tracking how often token typos reach production — if the answer is "rarely," deprioritize this.

**Effort:** High. Requires a CSS parser, type generation script, and CI integration.

### 4.2 Document the token architecture

**Change:** Create documentation covering:

- The 2-tier model (primitive -> semantic, with cva as component layer)
- Complete token inventory with descriptions and values
- How to create a new theme (which tokens must be defined)
- How tokens flow from CSS to components (the full pipeline)
- The z-index scale and stacking order
- The elevation system
- The spacing system (relational + inset)

**Benefit:** New contributors can understand the system without reading source code. Design decisions are recorded, not implicit. Reduces "which token do I use?" questions.

**Counter-question: Will anyone read it?**

Documentation is only useful if it's discoverable and maintained. A token docs page in fumadocs (alongside component docs) would be naturally discoverable. Maintenance is the real risk — if tokens change and docs don't update, stale docs are worse than no docs.

**Recommendation:** Implement documentation AFTER the naming convention (2.1) and structural changes are complete. Documenting a system you're about to change creates maintenance debt.

**Effort:** Medium. Writing and organizing documentation. Should be done after structural changes settle.

---

## What NOT To Do

Based on the research analysis and critical examination:

### Don't add component-specific tokens

The `cva()` system already serves as the component-level abstraction. Adding `--button-bg-primary`, `--input-border-default`, etc. would create a 3rd tier of indirection that adds maintenance cost without meaningful benefit.

**Why it's tempting:** It feels "clean" to have every visual property tokenized. But at Marigold's scale (1 theme actively used, ~50 components), the indirection cost exceeds the flexibility benefit. If a Button needs a different background in a different theme, the `cva()` variant handles it.

### Don't over-tokenize spacing

Not every `p-4` or `gap-2` needs a semantic token. The relational spacing system (joined/tight/related/peer/group/section/context) already covers the meaningful semantic cases. Layout spacing within a component (internal padding, margins between sub-elements) can remain as hardcoded Tailwind classes because it rarely changes per-theme.

**Rule of thumb:** Tokenize spacing when the value represents a semantic relationship between elements. Don't tokenize when it's an implementation detail of a single component's internal layout.

### Don't introduce Style Dictionary or a build pipeline

The current CSS-first approach (tokens in `theme.css`) is simple and works well with Tailwind v4. Style Dictionary adds a JSON/YAML source-of-truth layer, a build step, and platform-specific output transformations. This is justified for multi-platform design systems (web + iOS + Android). Marigold is web-only. The complexity isn't warranted.

**Exception:** If Figma Tokens Studio or Variables integration becomes a priority, revisit this decision. Design tool sync is the main driver for Style Dictionary adoption.

### Don't add z-index tokens

The current approach (z-index values as CSS custom properties in theme.css, applied as Tailwind utility classes in component implementations) is documented, intentional, and correct. The stacking order is component behavior, not theme personality. A different theme shouldn't change whether a Toast appears above or below a Modal.

### Don't change the page background to gray

The research (doc 11) thoroughly analyzes this and recommends keeping white. The stone palette is too crowded in the light range to sacrifice stone-50 as a page background. The "gray page with white cards" pattern works for single-product design systems (Polaris, Carbon) but is too opinionated for a multi-product system like Marigold.

### Don't create per-surface foreground tokens

Stone-950 text and stone-600 muted text pass WCAG AA on white, stone-50, AND stone-100 backgrounds. No per-surface foreground adaptation is needed unless backgrounds get darker than ~stone-200. Adding `--color-text-on-surface`, `--color-text-on-muted`, etc. would triple the text token count for zero visual benefit.

---

## Implementation Order

The phases above are roughly ordered by impact/effort ratio. Within phases, the suggested sequence:

```
Phase 1 (Quick Wins — can ship independently, any order):
  1.1  Change --color-selected to stone-200
  1.2  Remove legacy surface tokens + update fumadocs demos
  1.3  Consolidate easing functions (remove 13 unused)

Phase 2 (Structural — sequential within phase):
  2.3  Add --color-surface-sunken token (prerequisite: nothing)
  2.2  Add semantic radius tokens (prerequisite: nothing)
  2.1  Shared token contract (prerequisite: decide naming, then migrate)

Phase 3 (Quality — after Phase 2 settles):
  3.3  Fix @source inline inconsistencies
  3.1  Add primitive token layer (internal theme.css refactor)
  3.2  Optimize orange palette (requires design sign-off)

Phase 4 (Advanced — after architecture stabilizes):
  4.2  Document token architecture (after naming is final)
  4.1  TypeScript token types (after naming is final)
```

Each item in Phase 1 is independently shippable as a single PR. Phase 2 items can also be independent PRs but benefit from being coordinated. Phase 3 and 4 should wait until the structural work settles to avoid documenting or typing a system that's still changing.

---

## Decision Points for the Team

Before proceeding, these decisions need team alignment:

1. **Naming convention:** Do we adopt `--color-bg-*`/`--color-text-*` context prefixes, or keep the current style with better consistency? (Impacts Phase 2.1)

2. **Orange palette:** Does the brand team sign off on reduced-chroma orange values? (Impacts Phase 3.2)

3. **Shared token contract priority:** Is cross-theme portability a near-term goal? If only theme-rui matters for the foreseeable future, the naming convention work drops in priority. (Impacts Phase 2.1)

4. **`@theme` vs `@theme static`:** Should we evaluate switching to `@theme` (auto-generated utilities) to eliminate the manual `@source inline` maintenance? (Impacts Phase 3.3)

5. **TypeScript token types:** Has the team been bitten by silent token typo failures in production? If yes, prioritize Phase 4.1. If no, it's a nice-to-have. (Impacts Phase 4.1)
