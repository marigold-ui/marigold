# Monochromatic State Differentiation

How to visually distinguish component states (hover, selected, focus, active, disabled) when working with a single neutral tone palette — specifically Tailwind's `stone` scale.

## The Problem in Marigold Today

Marigold's theme-rui uses stone as its sole neutral palette. Several interactive state tokens resolve to **the exact same value**:

| Token              | Resolved Value | Used For                               |
| ------------------ | -------------- | -------------------------------------- |
| `--color-hover`    | `stone-100`    | Hover background in ListBox, Calendar  |
| `--color-selected` | `stone-100`    | Selected background in ListBox         |
| `--color-focus`    | `stone-100`    | Focus background in DateField segments |
| `--color-muted`    | `stone-100`    | Muted/readonly backgrounds             |

Hover, selected, focus, and muted all look identical. The only way a user can tell a ListBox item is _selected_ (vs merely hovered) is through a checkmark icon. This works for single-select, but breaks down in multi-select scenarios and lacks the visual confidence users expect.

---

## Industry Survey: How Others Solve This

### Material Design 3 — State Layers with Opacity

MD3's approach is the most systematic. Each state applies a **color overlay at a specific opacity** on top of the component's base color:

| State   | Overlay Opacity | Overlay Color |
| ------- | --------------- | ------------- |
| Hover   | 8%              | `on-surface`  |
| Focus   | 12%             | `on-surface`  |
| Pressed | 12%             | `on-surface`  |
| Dragged | 16%             | `on-surface`  |

For **selected** items, MD3 switches the container to `primary-container` (a tinted, tonal background) — fundamentally different from the hover overlay. When a selected item is also hovered, both effects stack: the tinted background persists with the 8% hover overlay on top.

**Key insight**: MD3 treats hover/focus/pressed as _transient overlays_ and selected as a _persistent container change_. These are two different visual systems that naturally stack.

### shadcn/ui — Accent + Checkmark

shadcn uses two CSS variable pairs:

- **Hover/Focus**: `bg-accent` / `text-accent-foreground` (a very light neutral, like `oklch(0.97 0.001 ...)`)
- **Selected**: Checkmark icon only — no background change on the selected item itself

The selected state relies entirely on the checkmark indicator. When reopening a dropdown, the selected item shows a `Check` icon at `left-2, absolute` with `pl-8` padding.

**Key insight**: shadcn explicitly chose to _not_ style the selected background differently. The checkmark carries all the semantic weight. This is minimal but can feel insufficient in dense lists.

### Apple HIG — Accent Color for Selection

Apple uses the system accent color (blue by default) as a tinted background for selected items in lists. Hover is either a very subtle gray or the same accent at reduced opacity. This creates a strong, unambiguous visual for selection.

**Key insight**: Even in Apple's otherwise neutral UI, selection breaks out of the neutral palette into an accent/tint color.

### Radix UI — Data Attributes for Compound States

Radix exposes `data-highlighted` (hover/keyboard focus) and `data-state="checked"` (selected) as separate attributes, enabling fully independent styling. This allows designs like:

```css
data-[highlighted]:bg-stone-100        /* hover: subtle gray */
data-[state=checked]:bg-stone-200      /* selected: slightly darker */
data-[state=checked]:font-medium       /* selected: bolder text */
```

**Key insight**: The attribute separation makes compound states (selected + hovered) trivially composable.

---

## Techniques for a Single-Tone Palette

When you only have one neutral scale (stone), these are the levers available, ordered from most to least impactful:

### 1. Background Shade Stepping

Use distinct stops on the stone scale for each state:

| State            | Background                               | Stone Step |
| ---------------- | ---------------------------------------- | ---------- |
| Default          | white / transparent                      | —          |
| Hover            | `stone-100`                              | 100        |
| Selected         | `stone-200`                              | 200        |
| Selected + Hover | `stone-200` (with darker text or border) | 200        |
| Active/Pressed   | `stone-200` or `stone-300`               | 200–300    |
| Disabled         | `stone-100` + reduced opacity            | 100        |

This is the simplest and most effective approach. Two adjacent stone stops (100 vs 200) are visually distinct enough on white backgrounds while remaining subtle.

### 2. Text Weight / Color Shift

Combine background changes with text treatment:

| State    | Text Treatment             |
| -------- | -------------------------- |
| Default  | `stone-950`, `font-normal` |
| Hover    | `stone-900`, `font-normal` |
| Selected | `stone-950`, `font-medium` |
| Disabled | `stone-500`, `font-normal` |

`font-medium` on selected items provides a secondary signal beyond background color. Be cautious — weight changes can cause layout shifts. Use `font-variation-settings` or tabular/fixed-width layouts to mitigate.

### 3. Left Border / Indicator Bar

A 2px left border on selected items is a strong, space-efficient signal:

```css
/* Selected item */
border-l-2 border-stone-950 bg-stone-100
```

This is commonly used in navigation sidebars and works well in vertical lists. The high-contrast indicator (stone-950 on white) is unambiguous.

### 4. Opacity-Based Overlays (MD3-Style)

Use `currentColor` at varying opacities:

```css
hover:bg-current/8      /* 8% opacity of current text color */
focus:bg-current/12     /* 12% opacity */
pressed:bg-current/12
selected:bg-current/12
```

This is what Marigold's ghost button already does (`hover:bg-current/10`). The advantage is it works on any background color. The disadvantage is the visual difference between 8% and 12% is extremely subtle — fine for hover vs pressed, but too subtle for hover vs selected.

### 5. Checkmark / Icon Indicator

The checkmark approach (used by shadcn and currently by Marigold):

- Selected items show a `Check` icon
- Hover items show only the background change

This works well when combined with at least one other technique (background shade or text weight). On its own, it requires users to scan for the icon, which is slower than a background change for visual scanning in long lists.

### 6. Subtle Accent Tint

Break out of pure neutral for the selected state by adding a very slight tint:

```css
/* Selected: stone with a warm tint */
bg-stone-200           /* pure neutral */
bg-orange-50           /* barely perceptible warm tint from brand */
bg-stone-950/5         /* 5% of brand color */
```

This is the Apple/MD3 approach adapted for minimalism. Even `orange-50` (`#fff9ed`) provides enough warmth to differentiate from `stone-100` while staying cohesive with a neutral palette.

---

## Recommendations for Marigold

### List Items (Select, ComboBox, ListBox, Menu)

**Current state**: Both hover and selected use `stone-100`. Only the checkmark differentiates.

**Recommended approach**: Background shade stepping + checkmark

```
Default:            bg-transparent
Hover:              bg-stone-100 (keep as-is)
Selected:           bg-stone-200 + checkmark visible
Selected + Hover:   bg-stone-200 + checkmark visible (hover doesn't darken further)
Focus (keyboard):   ring + bg-stone-100
Disabled:           text-stone-500, cursor-not-allowed
```

Token changes needed:

```css
/* Change from identical values to distinct steps */
--color-hover: var(--color-stone-100); /* keep */
--color-selected: var(--color-stone-200); /* change: was stone-100 */
```

This single token change propagates to all list components through the existing `bg-selected` / `bg-hover` classes.

**Alternative (accent tint)**: If the team wants more visual distinction:

```css
--color-selected: oklch(from var(--color-brand) 0.95 0.01 h);
```

This derives a very subtle tint from the brand color (stone-950), resulting in a barely warm gray that's distinct from the cool stone-100 hover.

### Ghost Button

**Current state**: `hover:bg-current/10` — this is actually a solid pattern.

**Analysis**: The ghost button's approach is already well-aligned with MD3's state layer system. `bg-current/10` gives ~10% opacity overlay of the current text color, which adapts to any context (light or dark backgrounds).

**Suggested refinements**:

```
Default:    bg-transparent (no background)
Hover:      bg-current/8   (subtle fill, slightly lower than current 10)
Pressed:    bg-current/12  (slightly more prominent)
Focus:      ring-2 ring-ring/50
Disabled:   opacity-50, cursor-not-allowed
```

The current `/10` is fine. If the team wants pressed feedback distinct from hover, consider adding:

```css
ghost:
  [ 'hover:bg-current/8',
  'active:bg-current/12',
  'pressed:bg-current/12',
  ];
```

The scale `8 → 12` follows MD3's hover → pressed progression and is perceptible.

### Input Text vs Placeholder

**Current state**: Placeholder is `stone-600`, text is `stone-950`.

**Analysis**: This is a 4-step gap on the stone scale (600 → 950) which provides good contrast. The WCAG AA minimum contrast ratio for placeholder text is debated — placeholder is not required to meet 4.5:1 since it's not "real" content, but the Web Content Accessibility Guidelines recommend placeholder text have at least 3:1 contrast against the background.

| Element                    | Color     | Approx Contrast vs White |
| -------------------------- | --------- | ------------------------ |
| Placeholder (`stone-600`)  | `#57534e` | ~4.6:1                   |
| Regular text (`stone-950`) | `#1c1917` | ~16.8:1                  |

Both pass WCAG AA. The visual difference is strong enough.

**Potential issue**: The placeholder color (`stone-600`) is identical to `--color-muted-foreground`. This means placeholder text and help text below the input look the same, which can cause confusion — the user may not realize the placeholder will disappear.

**Options to further differentiate**:

1. **Keep current** — the 600→950 gap is adequate and matches industry standard (shadcn uses the same pattern)
2. **Lighten placeholder slightly** — `stone-500` or `stone-400` makes placeholder feel more "ghostly" and transient, but watch WCAG contrast (stone-400 is ~2.7:1 — below 3:1)
3. **Add italic** — `placeholder:italic` is a classic typographic signal that the text is instructional, not user content. Low effort, high clarity. Used by many native form controls.

**Recommendation**: Keep `stone-600` for the placeholder value. Optionally add `placeholder:italic` in the `ui-input` utility if the team wants stronger differentiation from help text.

---

## Summary Decision Matrix

| Component            | Current                        | Problem                                        | Recommended Fix                          | Effort         |
| -------------------- | ------------------------------ | ---------------------------------------------- | ---------------------------------------- | -------------- |
| ListBox/Select items | hover=selected=`stone-100`     | Can't distinguish hover from selected          | Change `--color-selected` to `stone-200` | 1 token change |
| Ghost button         | `bg-current/10`                | None significant                               | Optionally add pressed state at `/12`    | Minor          |
| Input placeholder    | `stone-600` vs `stone-950`     | Adequate contrast                              | Consider `placeholder:italic`            | Optional       |
| Menu items           | `focus:bg-focus` (`stone-100`) | No selected state needed (menus are transient) | No change needed                         | None           |

---

## Visual Reference: Stone Scale States

```
stone-50   ░░░░░░░░░░  (background tint, barely visible)
stone-100  ▒░░░░░░░░░  hover / focus background     ← current hover + selected
stone-200  ▒▒░░░░░░░░  selected background           ← proposed selected
stone-300  ▒▒▒░░░░░░░  borders (input, surface)
stone-400  ▓▒▒░░░░░░░  ring color
stone-500  ▓▓▒░░░░░░░  disabled foreground
stone-600  ▓▓▓░░░░░░░  placeholder, muted text
stone-700  ▓▓▓▓░░░░░░  (unused)
stone-800  ▓▓▓▓▓░░░░░  (unused)
stone-900  █▓▓▓▓░░░░░  hover foreground
stone-950  ██▓▓▓░░░░░  foreground, brand
```

Each state occupies a distinct position on the scale, creating a clear visual hierarchy without any color additions.

---

## Sources

- [Material Design 3 — States](https://m3.material.io/foundations/interaction/states/applying-states)
- [Material Design 3 — Selection](https://m3.material.io/foundations/interaction/selection)
- [Material Design 3 — Elevation](https://m3.material.io/styles/elevation/applying-elevation)
- [shadcn/ui — Select](https://ui.shadcn.com/docs/components/radix/select)
- [shadcn/ui — Theming](https://ui.shadcn.com/docs/theming)
- [Radix UI — Select Primitives](https://www.radix-ui.com/primitives/docs/components/select)
- [Apple HIG — Color](https://developer.apple.com/design/human-interface-guidelines/color)
- [Button State Design — Mockplus](https://www.mockplus.com/blog/post/button-state-design)
- [Ghost Buttons in UX — UX Planet](https://uxplanet.org/ghost-buttons-in-ux-design-4cf3717334f8)
- [Creating Color Palettes for Design Systems — Imperavi](https://imperavi.com/blog/how-to-create-a-color-palette-for-design-systems/)
