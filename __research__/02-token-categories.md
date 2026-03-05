# Token Categories: Essential vs Nice-to-Have

## Essential Tokens (universally agreed upon)

### 1. Color

The most critical token category. Every design system has these.

**Subcategories:**

- **Primitive palette**: `blue.100` through `blue.900`, neutral scale, etc.
- **Semantic roles**: `text.primary`, `text.secondary`, `text.disabled`, `bg.surface`, `bg.canvas`, `border.default`, `border.error`
- **Interactive states**: `hover`, `pressed`, `focus`, `disabled`
- **Status/feedback**: `success`, `warning`, `error`, `info`

**Best practice**: Use a 12-step scale (like Radix) or 10-step scale (like Tailwind). Semantic tokens reference the primitive palette and change per theme.

### 2. Typography

Composite tokens that combine multiple properties.

**Individual properties:**

- Font family (heading, body, mono)
- Font size (scale of 6-10 steps)
- Font weight (regular, medium, semibold, bold)
- Line height (tight, normal, relaxed)
- Letter spacing (tight, normal, wide)

**Composite tokens** (DTCG `typography` type):

- `heading.1` through `heading.6`
- `body.default`, `body.small`
- `label`, `caption`, `overline`

### 3. Spacing

Defines the spatial rhythm of the system.

**Common approach**: A geometric or semi-geometric scale.

```
spacing.0  = 0
spacing.1  = 4px
spacing.2  = 8px
spacing.3  = 12px
spacing.4  = 16px
spacing.5  = 20px
spacing.6  = 24px
spacing.8  = 32px
spacing.10 = 40px
spacing.12 = 48px
spacing.16 = 64px
```

Some systems split into:

- `spacing.*` - tighter, within components (padding, gaps)
- `layout.*` - larger, between components (section margins)

### 4. Border Radius

Small but impactful. Usually 4-6 values.

```
radius.none = 0
radius.sm   = 4px
radius.md   = 8px
radius.lg   = 12px
radius.xl   = 16px
radius.full = 9999px
```

### 5. Shadow / Elevation

Defines depth/layering through box shadows.

```
shadow.xs  = 0 1px 2px rgba(0,0,0,0.05)
shadow.sm  = 0 1px 3px rgba(0,0,0,0.1)
shadow.md  = 0 4px 6px rgba(0,0,0,0.1)
shadow.lg  = 0 10px 15px rgba(0,0,0,0.1)
shadow.xl  = 0 20px 25px rgba(0,0,0,0.1)
```

Should be theme-aware (shadows behave differently in dark mode).

## Recommended Tokens (strong case for including)

### 6. Breakpoints

Essential for responsive design. Define the boundaries where layouts adapt.

```
breakpoint.sm  = 640px
breakpoint.md  = 768px
breakpoint.lg  = 1024px
breakpoint.xl  = 1280px
breakpoint.2xl = 1536px
```

**Verdict**: Essential for any multi-device design system.

### 7. Border Width

Small set, usually 2-4 values.

```
border.width.default = 1px
border.width.thick   = 2px
border.width.heavy   = 4px
```

## Nice-to-Have Tokens (situationally useful)

### 8. Motion / Animation

Increasingly recognized as important for polished UIs.

**Duration tokens:**

```
duration.instant  = 0ms
duration.fast     = 150ms
duration.normal   = 300ms
duration.slow     = 500ms
```

**Easing tokens:**

```
easing.default    = cubic-bezier(0.4, 0, 0.2, 1)
easing.in         = cubic-bezier(0.4, 0, 1, 1)
easing.out        = cubic-bezier(0, 0, 0.2, 1)
easing.in-out     = cubic-bezier(0.4, 0, 0.2, 1)
```

**Verdict**: Valuable for consistency. Define a small set. Don't over-tokenize.

### 9. Opacity

Useful for interaction states and disabled elements.

```
opacity.disabled = 0.5
opacity.hover    = 0.8
opacity.overlay  = 0.6
```

Material Design uses opacity layers for states instead of separate state colors - this reduces the number of color tokens needed.

**Verdict**: Nice-to-have. Useful when states are handled via opacity rather than separate color tokens.

## Controversial / Use Sparingly

### 10. Z-Index

**The 2024 Supernova expert panel questioned z-index tokens.** Donnie D'Amato argued they may be counterproductive with modern CSS features like the `top-layer` specification (used by `<dialog>`, popovers).

Arguments for:

- Prevents z-index wars in large teams
- Documents intended stacking order

Arguments against:

- Modern CSS handles stacking via `dialog`, `popover`, `top-layer`
- Z-index tokens don't compose well (they're global, not relative)
- Can create false sense of order while masking stacking context issues

**Verdict**: Controversial. If used, keep to 4-6 named layers (not numeric scales). Consider if modern CSS alternatives (`<dialog>`, `popover` API) reduce the need.

### 11. Component-Specific Tokens

Tokens scoped to individual components (e.g., `button.padding`, `card.radius`).

**Risks:**

- Token sprawl (can balloon to thousands)
- Low reusability
- Maintenance burden

**When justified:**

- Components consumed by external teams who need customization hooks
- Truly unique values that don't map to semantic tokens
- Design tools (Figma) need component-level mapping

**Verdict**: Use sparingly. Most components should compose from semantic tokens.

## Summary Matrix

| Category           | Essential?    | Typical Count    | Theme-Aware?        |
| ------------------ | ------------- | ---------------- | ------------------- |
| Color (primitive)  | Yes           | 80-150           | No (static palette) |
| Color (semantic)   | Yes           | 30-60            | Yes                 |
| Typography         | Yes           | 10-20 composites | Partially           |
| Spacing            | Yes           | 10-16            | No                  |
| Border radius      | Yes           | 5-7              | No                  |
| Shadow             | Yes           | 4-6              | Yes                 |
| Breakpoints        | Yes           | 4-6              | No                  |
| Border width       | Recommended   | 2-4              | No                  |
| Motion (duration)  | Nice-to-have  | 3-5              | No                  |
| Motion (easing)    | Nice-to-have  | 3-5              | No                  |
| Opacity            | Nice-to-have  | 3-5              | No                  |
| Z-Index            | Controversial | 4-6 layers       | No                  |
| Component-specific | Use sparingly | Varies           | Depends             |

## Sources

- [Supernova 2024 State of Design Tokens](https://www.supernova.io/blog/navigating-the-future-of-design-tokens-insights-from-supernovas-2024-webinar)
- [Duet Design System Tokens](https://www.duetds.com/tokens/)
- [USWDS Design Tokens](https://designsystem.digital.gov/design-tokens/)
- [Josh Cusick: Exploring Design Tokens](https://joshcusick.substack.com/p/exploring-design-tokens)
- [David X: Designing Tokens](https://david-x.medium.com/designing-tokens-in-react-what-makes-great-design-tokens-and-how-to-build-them-part-1-748cda3cc049)
