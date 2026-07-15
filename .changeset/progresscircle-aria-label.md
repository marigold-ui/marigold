---
'@marigold/components': patch
---

fix(DST-1622): `ProgressCircle` and `Loader` respect a consumer-provided `aria-label` / `aria-labelledby`.

**What changed:**

- `ProgressCircle` no longer overwrites a caller's accessible name. The built-in localized "loading" message is now only a fallback, applied solely when the consumer provides neither `aria-label` nor `aria-labelledby`.
- `Loader` (`BaseLoader`) uses the same fallback: the localized message is applied only when there is no `aria-label`, `aria-labelledby`, or visible `children` label — and it no longer emits a redundant `aria-label` next to a consumer's `aria-labelledby`.

**Why:**

Previously the `aria-label` was set _after_ `{...props}` was spread, so a caller passing `aria-label` (or `aria-labelledby`) had no effect and every progress circle announced the same generic "Loading…" string. This prevented labelling a spinner for its context (e.g. "Sending reminders" in a bulk-action flow).

**Impact:**

- Callers that pass no label (e.g. the spinners inside `Button`, `ComboBox`, `SearchInput`) are unchanged — they still get the localized fallback.
- Callers that pass `aria-label`/`aria-labelledby` now get their own accessible name.
