---
'@marigold/theme-rui': patch
---

fix(DST-1447): honor `prefers-reduced-motion: reduce` globally. The theme now disables every CSS transition when the user (or Chromatic during VRT) requests reduced motion. CSS `@keyframes` animations are left alone so intentional motion (Sidebar slide-in, Drawer entrance, spinners) keeps working, and real users without the preference see no change. Side effect: stabilizes Chromatic visual regression snapshots that previously flickered when a focus-color transition was captured mid-frame on Autocomplete, Select, ComboBox, and Tray stories.
