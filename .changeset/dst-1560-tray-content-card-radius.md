---
'@marigold/theme-rui': patch
---

fix(DST-1560): align Tray content padding and Card radius to the shared surface tokens

`Tray` content used `p-2` while its own header and actions (and Dialog/Drawer content) follow the `ui-panel-content` rhythm (`px-6 py-4`), leaving the content visually out of step within the same component. Switched it to `ui-panel-content`.

`Card` hardcoded `rounded-md` while the rest of the raised surface tier (`Panel`, `Accordion`) uses `rounded-surface`. Moved Card to `rounded-surface` in its `base` so every variant (`default`, `master`, `admin`) shares the same 8px corner, making the raised tier consistent.
