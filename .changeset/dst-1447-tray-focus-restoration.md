---
'@marigold/components': patch
---

fix(DST-1447): restore focus to the Tray trigger on close. Under `prefers-reduced-motion: reduce`, `TrayModal` now skips `AnimatePresence` and renders a plain RAC `ModalOverlay`, so `FocusScope.restoreFocus` runs synchronously and the trigger reliably regains focus.
