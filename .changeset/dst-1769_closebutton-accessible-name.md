---
'@marigold/components': patch
---

fix(DST-1769): give `CloseButton` an accessible name so screen readers can announce it

`<Dialog closeButton>` rendered its close button with no accessible name at all. `CloseButton` renders an icon only, `Dialog` passed no `aria-label`, and the `X` glyph contributes nothing to the name computation, so the computed name was the empty string. VoiceOver announced it as a bare "button". Every other call site in the package already passed a localized label, so `Dialog` was the only component affected, but it is one of the most used, and `closeButton` is on in most of our examples.

This was a WCAG 2.1 SC 4.1.2 (Name, Role, Value) failure for every product embedding a Marigold dialog. It was not a total loss of function: React Aria's `Modal` still renders its own visually hidden dismiss button, and Escape still closes the dialog. The visible affordance was the unlabelled one.

**`Dialog` now passes a localized `close` label**, matching `Toast`, `SectionMessage`, `Drawer`, `SidebarModal` and `FileFieldItem`.

**`CloseButton` gained a fallback**, because it is public API and consumer code cannot be linted from here. When nothing else names the button, it falls back to the localized `close` string, so an unnamed close button can no longer reach production.

**The fallback reads the slot's resolved context, not the `slot` prop.** That guard is load-bearing, not defensive tidiness, but a `slot` on its own proves nothing about naming. React Aria's `TagGroup` names its `remove` slot through context, and a locally set `aria-label` wins over a context one, so an unconditional fallback relabelled every removable tag's button from "Remove News" to "Close". React Aria's `Dialog` registers a `close` slot that carries only `onPress` and no label at all, so trusting the prop would have left `<CloseButton slot="close" />` unnamed, which is this very bug reached through its own fix. `CloseButton` asks `useSlottedContext` what the slot resolved to and falls back only when that context supplies no name. A test in `TagGroup.test.tsx` now pins the labelled case.

**The fallback also warns in development.** A silent fallback would trade a loud bug for a quiet one. `CloseButton` is labelled "Close navigation", "Dismiss drawer" and "Remove file" at its existing call sites, so a generic "Close" is frequently the wrong word. An unnamed button fails an automated accessibility check. A confidently mislabelled one passes every check and misinforms the user. The warning keeps the signal where the fallback would have swallowed it, following the same pattern `Dialog` already uses when it renders without an accessible name.

`Dialog`'s own close button test now queries by accessible name instead of by DOM position. The positional lookup is what let this ship.
