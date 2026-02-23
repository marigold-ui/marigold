---
"@marigold/components": minor
"@marigold/theme-rui": minor
"@marigold/system": minor
---

Update ActionBar with enter/exit animations, keyboard support, and built-in Table integration.

- Add `useActionBar` hook and `ActionBarContext` for managing selection state between ActionBar and Table
- Add `actionBar` render prop to Table for automatic selection wiring and ActionBar positioning
- Add enter/exit animations using `motion/react` and react-aria `useEnterAnimation`/`useExitAnimation`
- Add Escape key support to clear selection via `FocusScope` and `useKeyboard`
- Add screen reader announcement when ActionBar appears
- Add localized `selectedCount`/`selectedAll` messages (en-US, de-DE)
- Update ActionBar theme slots: rename `actions` to `toolbar`, add `selection` slot
- Update theme type definition to match new slot names
