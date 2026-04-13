---
'@marigold/theme-rui': major
---

DST-1209: Refactor elevation documentation and remove deprecated utilities.

**Breaking: Remove `util-surface-*` utilities**
- Delete `util-surface-sunken`, `util-surface-body`, `util-surface-raised`, `util-surface-overlay`
- Remove `utils.css` from theme-rui build

**Documentation:**
- Rewrite elevation page around the 3-tier shadow system (border, raised, overlay)
- Add surfaces section explaining `bg-background`, `bg-surface`, `bg-muted`, and `ui-surface`
- Add interactive demos, annotated SVG diagram, and per-tier Do/Don't guidelines
- Add migration table from legacy `util-surface-*` to new tokens

**Fixes:**
- Fix broken `bg-bg-surface-*` tokens in card-elevation demo, inset-equal demo, and Columns story
- Update Card docs elevation section to match new page structure
