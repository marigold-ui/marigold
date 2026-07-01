---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat([DST-1429]): `Card` now exposes a `Panel`-aligned padding API.

**What changed:**

- `Card` accepts `p` / `px` / `py` props (mutually exclusive `p` vs `px+py`), resolving to CSS custom properties `--card-px` and `--card-py` on the container. Defaults to `square-regular`.
- A new `space` prop controls the gap between slots, resolving to `--card-gap`. Defaults to `regular`.
- `Card.Body` and `Card.Footer` accept an opt-in `bleed` prop to skip horizontal padding for tables, media, or full-width action bars.
- Internally, `Card` switched from CSS grid with `grid-template-areas` to a flex column with `gap-y`. JSX order now determines visual order — place `Card.Preview` first when used.
- Slot theme styles (`header`, `body`, `footer`) no longer hardcode `px-4` / `py-*`; padding lives in the component layer and is driven by the CSS variables above.
- `Card.Preview` automatically escapes the container's vertical padding when used as the first or last child via negative margins.

**Why:**

Cards previously had no consumer-controllable padding API and no default padding on the container — content rendered as direct children of `<Card>` was visually broken. The new API mirrors `Panel`'s padding model so the two surfaces behave consistently.

**Migration:**

- Wrap bare children in `<Card.Body>`. Bare children inside `<Card>` are no longer rendered with horizontal padding; this matches `Panel`'s composition contract.
- If you used `Card.Preview` for media at the top, keep doing so — it stays edge-to-edge.
- No changes needed for the canonical composition (`Preview` + `Header` + `Body` + `Footer`).
