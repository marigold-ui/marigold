---
'@marigold/components': patch
---

fix(DST-1447): restore focus to the Tray trigger on close under `prefers-reduced-motion: reduce`. `TrayModal` now skips `AnimatePresence` in that branch and renders a plain RAC `ModalOverlay`, so `FocusScope.restoreFocus` runs synchronously and the trigger reliably regains focus. Users without the preference still hit the same race — a full fix is tracked as follow-up.
