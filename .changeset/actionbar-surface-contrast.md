---
"@marigold/components": patch
"@marigold/theme-rui": patch
"@marigold/theme-docs": patch
"@marigold/system": patch
---

Update ActionBar styling with surface contrast and dedicated button slot.

- Apply `ui-surface-contrast` utility to ActionBar container for adaptive theming
- Add `button` slot to ActionBar theme for properly styled action buttons (replaces `Button.ghost`)
- Add `clearButton` hover/focus/disabled styles using theme-aware utilities
- Add `ActionBar.styles.ts` to `theme-docs` with matching dark surface appearance
- Update `ActionButton` to use `ActionBar.button` classNames instead of `Button.ghost`
- Replace `CloseButton` with `IconButton` for the clear selection button
- Update stories to use `lucide-react` icons directly
