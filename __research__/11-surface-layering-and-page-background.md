# Surface Layering and Page Background Color

Should Marigold support multiple background/foreground combinations for surface hierarchy? Should the page background be a tinted gray instead of pure white?

---

## Marigold's Current State

```css
--color-background: var(--color-white); /* page bg: pure white */
--color-foreground: var(--color-stone-950); /* page text */

--color-surface: var(--color-white); /* component surfaces: also white */
--color-surface-border: var(--color-stone-300); /* surface borders */

--color-secondary: var(--color-stone-50); /* secondary bg */
--color-secondary-foreground: var(--color-stone-950);

--color-muted: var(--color-stone-100); /* muted/readonly bg */
--color-muted-foreground: var(--color-stone-600);
```

The problem: `--color-background`, `--color-surface`, and card backgrounds are all `#ffffff`. The page, a card sitting on the page, and a popover sitting on the card are visually identical surfaces. The only distinguishing factor is `--shadow-elevation-*` and borders.

Legacy tokens (`--surface-sunken`, `--surface-body`, `--surface-raised`, `--surface-overlay`) attempted to solve this but are marked "OLD (to be removed)" and all resolve to white or muted anyway.

---

## How Major Systems Handle This

### The Two Schools

Every system falls into one of two approaches:

**School A: Gray page, white cards** (surfaces "float")

- Shopify Polaris: page `#f1f1f1`, cards `#ffffff`
- Apple (grouped): page `#f2f2f7`, cards `#ffffff`
- Carbon (Gray 10 theme): page `#f4f4f4`, cards `#ffffff`

**School B: White page, gray sections** (regions are "inset")

- GitHub Primer: page `#ffffff`, muted areas `#f6f8fa`
- Apple (system): page `#ffffff`, secondary `#f2f2f7`
- Carbon (White theme): page `#ffffff`, cards `#f4f4f4`
- shadcn/ui: page `#ffffff`, muted `#f4f4f5`

**Both schools use the same two colors** — they just swap which one is the page and which is the surface. The difference is philosophical:

- School A says: "Content lives on cards that float above a recessed background." Best for admin dashboards, complex data-heavy layouts with many distinct panels.
- School B says: "Content flows on a clean canvas; sections are visually grouped when needed." Best for content-heavy pages, documentation, simpler layouts.

### How Many Levels Are Actually Used?

| System    | Levels Defined      | Levels Commonly Used | Notes                                        |
| --------- | ------------------- | -------------------- | -------------------------------------------- |
| Carbon    | 4 (base + 3 layers) | 2-3                  | Layer-03 is rare in practice                 |
| Polaris   | 4 (bg + 3 surfaces) | 2                    | tertiary is uncommon                         |
| MD3       | 7 surface roles     | 3-4                  | Many roles serve layout, not nesting         |
| Radix     | 5 (steps 1-5)       | 2-3                  | Steps 3-5 are component states, not surfaces |
| Primer    | 3                   | 2                    | subtle and inset share the same value        |
| Apple     | 3 x 2 sets          | 2                    | Tertiary alternates back to primary value    |
| shadcn/ui | 3                   | 2                    | card defaults to same as background          |

**Every system converges on 2 actively used levels in light mode.** Some define more for completeness, but real-world usage clusters around: one background + one surface (or vice versa). A third level exists for edge cases (nested panels, code blocks, inset wells).

### The Alternating Pattern

Carbon and Apple use a clever trick in light mode: backgrounds **alternate** between white and light gray at each nesting level:

```
White theme:     white → gray → white → gray
Gray 10 theme:   gray → white → gray → white
```

This means a card (gray) on a page (white) can contain a nested section (white again) without running out of contrast. It's elegant but requires components to be "layer-aware" — they need to know which level they're on. Carbon solves this with a `<Layer>` React component that increments context.

### MD3's Tone-Based Evolution

MD3 moved from "elevation = shadow + opacity overlay" to "elevation = shadow + tonal surface color." Why:

1. Opacity overlays couldn't guarantee contrast ratios
2. On large screens, shadow-only hierarchy wasn't enough — you need color difference
3. Tonal surfaces are independent of elevation — you can have a high surface without a shadow

MD3 defines 5 container levels (lowest → low → default → high → highest) at neutral tones 100, 96, 94, 92, 90. These are pre-computed, not runtime overlays.

---

## Critical Analysis: Should Marigold Use a Gray Page Background?

### Arguments For

**1. Cards and panels gain automatic visual separation**

With a gray page, every `bg-surface` (white) card instantly "pops" without needing a border or shadow. This reduces the reliance on `--shadow-elevation-raised` and `--color-surface-border` for visual hierarchy.

Current Marigold: A card on a white page needs both a border AND a shadow to be visible. Remove either, and the card disappears into the page.

**2. The admin/dashboard context benefits most**

Marigold's primary consumer (Reservix) builds data-heavy admin interfaces — exactly the context where Polaris, Carbon, and MD3 recommend gray backgrounds. Multiple panels, tables, and data cards benefit from the "floating on gray" treatment.

**3. Reduces visual noise from borders**

If surfaces are self-evident through background contrast, you can remove decorative borders from cards and panels. Fewer borders = cleaner visual language. Polaris does this extensively — their cards have no visible border in light mode.

**4. Better dark mode path**

Systems that start with a gray page in light mode have an easier dark mode story. The mental model is already "page is one shade, surfaces are another." In dark mode, you just invert: page becomes dark gray, surfaces become slightly lighter gray.

### Arguments Against

**1. "Gray page" can feel dated or heavy**

The "gray page with white cards" pattern peaked around 2016-2019 (Material Design 2 era, Bootstrap dashboards). Modern consumer-facing products (Linear, Vercel, Notion, Arc) trend toward white or near-white pages with minimal surface distinction.

**Counter-question: Is this just a trend, or is there a functional reason?**

The trend toward white pages correlates with simpler layouts and content-first design. Admin dashboards are NOT simpler — they genuinely benefit from surface hierarchy. The "looks dated" concern may not apply to the enterprise/admin context where Marigold operates.

**2. It introduces a coordination problem**

If the page is gray, every component that previously assumed "I sit on white" now has wrong contrast calculations. All border tokens, shadow values, and contrast ratios need to be re-evaluated against the new page color.

Marigold's current `--color-border: stone-200` was chosen for contrast against white. Against stone-50 (`#fafaf9`), the contrast drops. Against stone-100 (`#f5f5f4`), it may become invisible.

**3. It constrains the stone palette further**

Currently, stone-50 is unused, stone-100 is `--color-muted/hover/focus/selected`, and stone-200 is `--color-border`. If stone-50 becomes the page background:

```
stone-50:  page background        ← NEW
stone-100: hover / muted / focus  (already crowded, see doc 09)
stone-200: selected / border      (already crowded)
stone-300: input border, surface border
```

There's almost no room left between page and interactive states. The entire usable range for backgrounds is stone-50 to stone-200 — just 3 steps, and stone-100 is already overloaded.

**4. It may not match the existing product context**

If Reservix products already ship with white backgrounds and users are accustomed to that, changing the page background is a significant visual regression. It touches every single page.

### The Middle Ground: Keep White Page, Add Surface Tokens

Several systems (Primer, shadcn, Apple/system) keep pure white as the page but define distinct surface tokens for when hierarchy IS needed:

```css
/* Page stays white */
--color-background: var(--color-white);

/* Surfaces can vary */
--color-surface: var(--color-white); /* default: same as page */
--color-surface-raised: var(--color-white); /* cards, panels */
--color-surface-sunken: var(--color-stone-50); /* inset areas, code blocks */
--color-surface-overlay: var(--color-white); /* modals, popovers */
```

This keeps the current look while adding the vocabulary for hierarchy when a specific layout needs it.

---

## Critical Analysis: Multiple Background/Foreground Combinations

### How Many bg/fg Pairs Does Marigold Need?

Currently Marigold defines these bg/fg pairs:

| Background                              | Foreground                         | Purpose               |
| --------------------------------------- | ---------------------------------- | --------------------- |
| `background` (white)                    | `foreground` (stone-950)           | Page                  |
| `brand` (stone-950)                     | `brand-foreground` (stone-50)      | Primary brand actions |
| `secondary` (stone-50)                  | `secondary-foreground` (stone-950) | Secondary actions     |
| `muted` (stone-100)                     | `muted-foreground` (stone-600)     | Help text, readonly   |
| `disabled` (stone-200)                  | `disabled-foreground` (stone-500)  | Disabled state        |
| `hover` (stone-100)                     | `hover-foreground` (stone-900)     | Hover state           |
| `destructive`                           | `destructive-foreground`           | Error actions         |
| `success/warning/info` + muted variants | (each has fg)                      | Status                |

That's roughly 8 background/foreground pairs for general use, plus 4 status color sets.

### Are Multiple Gray-Tone bg/fg Pairs Useful?

**Yes, but not as many as you'd think.**

The useful gray pairs in a monochromatic system are:

| Pair         | Background | Foreground | Use Case                 |
| ------------ | ---------- | ---------- | ------------------------ |
| **Default**  | white      | stone-950  | Body content             |
| **Muted**    | stone-100  | stone-600  | Secondary text, captions |
| **Subtle**   | stone-50   | stone-950  | Alternate rows, sidebars |
| **Inverted** | stone-950  | stone-50   | Brand, emphasis          |

Four pairs cover nearly all real-world needs. Beyond that, you're creating distinctions users can't perceive.

**The danger of too many gray pairs:**

Carbon defines `$text-primary`, `$text-secondary`, `$text-placeholder`, `$text-on-color`, `$text-on-color-disabled`, `$text-disabled`, `$text-error`, `$text-helper`, `$text-inverse`, plus layer-specific variants (`$text-on-layer-01`, etc.). That's 10+ text tokens for gray tones alone. In practice, developers can't reliably tell `text-secondary` from `text-placeholder` from `text-helper` — they all look like "slightly lighter gray text."

Polaris has a similar problem — `--p-color-text`, `--p-color-text-secondary`, `--p-color-text-subdued`, `--p-color-text-disabled` create a 4-step text hierarchy where the middle two are hard to distinguish at a glance.

**Rule of thumb from the research:**

- **2 text grays** (primary + secondary/muted) are always useful
- **3 text grays** (+ disabled) are sometimes needed
- **4+ text grays** cause decision paralysis and visual inconsistency

The same applies to background grays:

- **2 backgrounds** (default + muted/subtle) cover 90% of use cases
- **3 backgrounds** (+ sunken/inset) handle edge cases
- **4+ backgrounds** are rarely all used in the same view

### What About Foreground Colors On Each Background?

This is where systems diverge significantly:

**Approach A: Foreground is constant** (Primer, shadcn)

```css
/* Text color doesn't change with background */
--foreground: stone-950;
--muted-foreground: stone-600;
/* Used on both white AND muted backgrounds */
```

**Approach B: Foreground adapts per surface** (Carbon, MD3)

```css
/* Each layer gets its own text colors */
$text-primary on $layer-01     /* may differ from */
$text-primary on $layer-02     /* which may differ from */
$text-primary on $layer-03
```

Approach B is more correct for accessibility (contrast ratios depend on the background) but significantly more complex. Marigold's current backgrounds (white, stone-50, stone-100) are all light enough that `stone-950` text passes WCAG AA on all of them. **Foreground adaptation is unnecessary unless the background gets darker than ~stone-200.**

---

## Recommendation for Marigold

### Keep White Page Background

Reasons:

1. The stone palette is already crowded in the light range (doc 09). Using stone-50 as page background removes a step from an already tight budget.
2. The existing product likely ships on white — changing this is high-risk for low reward.
3. White pages are the norm for the content types Marigold handles (forms, tables, data entry).

### Add a Subtle Surface Token

Define one additional surface level for inset/recessed areas:

```css
/* Keep existing */
--color-background: var(--color-white);
--color-surface: var(--color-white);

/* Add */
--color-surface-sunken: var(--color-stone-50);
```

Use `surface-sunken` for:

- Code block backgrounds
- Sidebar backgrounds in split layouts
- Table header rows (as alternative to current `bg-muted`)
- "Well" or "inset" areas within cards

This gives 3 usable background levels without touching the page:

```
white          → primary content, cards, overlays
stone-50       → sunken/inset areas, sidebars
stone-100      → hover state, muted areas, readonly
```

### Do NOT Add More Than 3 Background Levels

Every additional level:

- Narrows the gap between adjacent levels (stone goes in steps of ~5% lightness)
- Increases decision cost for developers ("is this muted or subtle or secondary?")
- Creates more tokens to maintain across themes

Three levels (white, stone-50, stone-100) are sufficient. If a layout needs more hierarchy, use borders and shadows — that's what `--shadow-elevation-*` is for.

### Do NOT Create Paired Foreground Tokens for Each Surface

Stone-950 text on white, stone-50, and stone-100 backgrounds all pass WCAG AAA. Stone-600 muted text passes WCAG AA on all three. No per-surface foreground tokens are needed.

If a future dark mode is added, the `--color-foreground` and `--color-muted-foreground` tokens already exist as the remapping points — they just need to be set to light values when the background flips to dark.

### Consider the "Floating Cards" Pattern as Opt-In

For dashboard-heavy layouts where Marigold consumers WANT gray-page-with-white-cards, provide it as a layout utility rather than a global page change:

```css
/* Optional: consumers can apply this to their layout root */
@utility ui-dashboard-surface {
  background: var(--color-stone-50);
}
```

This keeps the default (white page) stable while giving dashboard layouts the option to use a gray background. Cards with `bg-surface` (white) will automatically contrast against the gray parent.

---

## Counter-Arguments to Our Own Recommendations

### "Isn't stone-50 too subtle to distinguish from white?"

Stone-50 is `#fafaf9`. On a calibrated monitor, the difference from `#ffffff` is 3-4 units in L\* (CIE Lab). This IS visible when the two colors are adjacent (e.g., a white card on a stone-50 background) but may be invisible when separated.

**Test this**: Open any Polaris admin page. Their page bg is `#f1f1f1` — much darker than stone-50. Even Radix step 2 (`#f9f9f9`) is barely perceptible without adjacent white.

If stone-50 proves too subtle, stone-100 (`#f5f5f4`) is a safer choice for `surface-sunken`. But this conflicts with `--color-muted` (already stone-100), creating the same collision problem identified in doc 09.

**Potential resolution**: If `surface-sunken` needs to be stone-100 and `muted` is also stone-100, consider whether they should be the same token. A "muted background" and a "sunken surface" often serve the same visual purpose — a de-emphasized region. Merging them simplifies the system.

### "If we keep white, aren't we ignoring what Polaris/Carbon do?"

Polaris and Carbon serve different contexts:

- Polaris is for Shopify admin — a single, controlled application with a known layout
- Carbon is for IBM enterprise — massive, dense data applications

Marigold is a design system consumed by multiple products that may have very different layouts. A gray page default is opinionated in a way that white is not. White is the "safe default" that works for all contexts; gray pages are an optimization for specific layouts.

### "Don't we need this for dark mode eventually?"

Dark mode does require surface layering — but it requires it in the opposite direction (dark base, progressively lighter surfaces). Defining light-mode surface layers doesn't help with dark mode unless the token names are abstracted. The recommendation to use `--color-surface-sunken` (not `--color-stone-50`) is correct precisely because the token can be remapped for dark mode.

---

## Summary

| Question                                             | Answer                                                         | Confidence                                                  |
| ---------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------- |
| Should the page background be gray instead of white? | **No** (keep white as default)                                 | High — stone palette is too crowded, risk outweighs benefit |
| Should there be multiple bg/fg combinations?         | **Yes, but limited** — max 3 background levels                 | High — industry consensus is 2-3 levels                     |
| Should foreground adapt per background?              | **No** — stone-950 and stone-600 work on all light backgrounds | High — only needed if backgrounds get darker                |
| Should "gray page" be available as opt-in?           | **Yes** — as a layout utility, not a default                   | Medium — depends on consumer needs                          |
| How many text gray levels are useful?                | **2** (primary + muted), **3** with disabled                   | High — 4+ causes confusion                                  |

---

## Sources

- [IBM Carbon — Color Usage](https://carbondesignsystem.com/elements/color/usage/)
- [IBM Carbon — Themes Overview](https://carbondesignsystem.com/elements/themes/overview/)
- [Shopify Polaris — Color Tokens](https://polaris.shopify.com/tokens/color)
- [Shopify Polaris — Palettes and Roles](https://polaris.shopify.com/design/colors/palettes-and-roles)
- [Radix Colors — Understanding the Scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)
- [Material Design 3 — Color Roles](https://m3.material.io/styles/color/roles)
- [Material Design 3 — Tone-Based Surface Colors](https://m3.material.io/blog/tone-based-surface-color-m3/)
- [GitHub Primer — Color Overview](https://primer.style/foundations/color/overview/)
- [Apple HIG — systemBackground](https://developer.apple.com/documentation/uikit/uicolor/systembackground)
- [shadcn/ui — Theming](https://ui.shadcn.com/docs/theming)
