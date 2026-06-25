---
'@marigold/theme-rui': patch
---

refa(DST-1565): draw the `ui-surface` border as a translucent outset hairline instead of the gradient `background-clip` trick

`ui-surface` previously faked its border by reserving a `1px solid transparent` border and showing a `border-box`-clipped background gradient (with a darken-toward-bottom bevel) through it. That hijacked the entire `background` property and forced `ui-state-error` to override the border via a `border-*` color.

The border is now a 1px Tailwind `ring` (routed through `--tw-ring-shadow`), so it composes into the same `box-shadow` chain as `shadow-elevation-*` without clobbering them. `background` is a plain fill again, and `ui-state-error` just swaps `--ui-border-color`. The `--ui-border-color` theming contract is unchanged.

Two deliberate properties of the new hairline:

- **Translucent.** The resting color is a new `--color-surface-border` token — the charcoal hue at low alpha (`oklch(from var(--color-charcoal-950) l c h / 0.1)`). Because it is translucent, the edge composites over whatever ground the surface sits on, so its contrast stays consistent on white, the page background, or a tinted panel — where a fixed gray reads heavy on white and washes out on gray. State overrides (focus → `--color-ring`, error → `--color-destructive-accent`) remain opaque on purpose.
- **Outset.** The ring sits just outside the box, so it is painted above child content. A child that bleeds edge-to-edge (e.g. a `Table` inside `Panel.Content bleed`) can no longer cover the left/right border — which an inset ring or a `background-clip` border did.

Form controls keep a clearly visible boundary. A field edge is an affordance the user must see (WCAG 1.4.11 non-text contrast), so the controls built on `ui-input` (Input, Select, TextArea, NumberField, DateField, TagField) override the `ui-surface` ring color with the existing opaque `--color-border` (charcoal-300) — the same boundary color Checkbox and Radio already use — rather than the lighter translucent `--color-surface-border` hairline. No new token: the decorative surface hairline stays whisper-light for Card/Panel/Dialog/Menu, while every form-control boundary now reads with one consistent opaque line.

The opaque `--color-border` token is otherwise unchanged and still used for dividers/decoration on a known surface (table rows, panel section rules), which sit on white and have no ground to adapt to.

Because `--ui-border-color` is registered `inherits: false`, the opaque-border contract only reaches the ring when `ui-input` sits on the same element as the `ui-surface` ring. That holds for the single-element controls (Input, Select, TextArea, TagField), but the composite controls split the two across elements — `DateField` and `NumberField` put `ui-surface` on the field/group wrapper and `ui-input` on the inner input — so the var never reached the ring and those controls fell back to the lighter translucent `--color-surface-border` hairline (e.g. a `DatePicker`'s field read visibly lighter than the inputs beside it). Both now set `--ui-border-color: var(--color-border)` on their wrapper so every form-control boundary matches. Their focused-invalid border was also aligned to `--color-destructive-accent` (matching `ui-state-error`) instead of `--color-destructive`.

Visually: the subtle 1px border gradient/bevel is intentionally dropped (a flat ring cannot gradient), the resting edge is a touch softer (translucent vs. opaque charcoal-300), and corners antialias slightly differently.

`ui-surface-contrast` (primary Button, ActionBar) is reworked to the same model, inverted in value. It dropped the `background-clip` border and its lighter-than-fill edge — which ringed the dark surface in light — for a 1px `ring` that is a darker shade of the fill (a crisp dark hairline, no rim). The light now lives on the face: a soft glow pooled at the top that fades before the edges, over a gentle top-down fill gradient. Highlight and gradient still derive from the `--ui-highlight-color` / `--ui-background-color` override vars, so themes can retint.

The three elevation tokens (`--shadow-elevation-border/raised/overlay`) are retuned to match. Now that the ring owns the crisp edge, the shadows carry only lift: the harsh contact layer (previously up to `0.32` alpha) is cut sharply and the darkness spread across lighter layers, lit from above with negative spread so each shadow stays contained inside its own footprint — a dense field of elevated elements stays calm instead of bleeding into a haze. The shadow color is tinted to the warm charcoal hue instead of pure black so the lift sits into the warm-neutral ground.
