---
target: examples Filter (venues table)
total_score: 26
p0_count: 0
p1_count: 2
timestamp: 2026-06-30T10-18-52Z
slug: docs-app-examples-examples-filter
---

# Critique — Filter / Venues data table (examples/filter)

Method: dual-agent (A: design review · B: detector + screenshot evidence)

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                             |
| --------- | ------------------------------- | --------- | ----------------------------------------------------- |
| 1         | Visibility of System Status     | 3         | Skeleton good; "Updating…" spinner orphaned top-right |
| 2         | Match System / Real World       | 3         | "Traits" column label is jargon                       |
| 3         | User Control and Freedom        | 3         | Per-chip remove works; no toolbar "clear all"         |
| 4         | Consistency and Standards       | 2         | Skeleton (4 cols) ≠ loaded table (8–10 cols)          |
| 5         | Error Prevention                | 3         | NumberField/Slider guardrails; delete unconfirmed     |
| 6         | Recognition Rather Than Recall  | 2         | "Traits" unexplained; no live result count in drawer  |
| 7         | Flexibility and Efficiency      | 2         | Sort on 3/10 cols; no bulk delete; no shortcut        |
| 8         | Aesthetic and Minimalist Design | 2         | Tag-pill clutter → extreme row-height variance        |
| 9         | Error Recovery                  | 3         | Error boundary good; delete failure unhandled         |
| 10        | Help and Documentation          | 3         | Inline field descriptions adequate                    |
| **Total** |                                 | **26/40** | **Acceptable — strongest of the five**                |

## Anti-Patterns Verdict

**LLM:** Not slop. Restrained toolbar, semantic columns, calm "None" empty state. Craft defects (pill clutter, skeleton mismatch, spinner placement), not pattern plagiarism.

**Detector:** Clean (exit 0).

**Visual evidence + CONFIRMED BUG:** Console logs `<svg> width/height: Expected length, "defaultpx"`. Traced to `FetchingIndicator.tsx:18` — `<ProgressCircle size="default">` forwards the token `"default"` straight to `SVG.tsx` (`width={`${size}px`}`), yielding `width="defaultpx"`. `ProgressCircle` never maps the `"default"` size token to a numeric px. Real component-level defect. Also: skeleton shows 4 column groups vs 8 loaded; skeleton + spinner shown simultaneously; "Applied Filters / None" occupies a full dead row at rest; star/trash icons (~12px) smaller than sort icons (~16px); results-per-page stepper baseline misaligned with page buttons.

## What's Working

1. Loading architecture is correct — skeleton on initial fetch only; background refetch preserves rows.
2. Toolbar restrained & well-composed (SearchField + Filter, `Inline alignX="between"`).
3. Applied-filter chip removal precise (per-chip `onRemove` + `removeAll`, `+N more` truncation).

## Priority Issues

- **[P1] Tag-pill column explosion.** Grand Avenue Ballroom = ~10 badges in one row → 4–5× row height, data-correlated height kills vertical scanning. **Fix:** collapse multi-value cells to count + Popover, or merge Amenities/Parking into one "Facilities" column. (Badge/Inline/Tooltip/Popover.) → `distill`
- **[P1] Skeleton structurally incoherent with loaded table.** 4 flat strips vs 10-col dense table teaches a mismatched pattern. **Fix:** build skeleton with Table-matched column widths; if Table can't host skeleton cells, **SYSTEM GAP**. → `harden`
- **[P2] "Updating…" spinner divorced from the data + not announced.** ~900px from the table; `FetchingIndicator` is `aria-hidden` so SR users get no in-progress signal. **Fix:** move indicator into the table/pagination region; `role="status"` `aria-live="polite"`. → `harden`
- **[P2] "Applied Filters: None" is unconditional dead real estate.** Always-empty on arrival trains users to ignore it. **Fix:** render `null` when no active filters; label inline with first chip. → `simplify`
- **[P3] Delete has no confirmation and no failure feedback.** Trash fires immediately, no undo/rollback. **Fix:** Toast "Deleted X. Undo." or Dialog confirm (ToastProvider/useToast already available). → `harden`
- **[BUG] ProgressCircle `size="default"` → invalid SVG length.** Fix `FetchingIndicator` to a valid size and/or fix `ProgressCircle` to map size tokens before forwarding to SVG width/height. → `harden`

## Persona Red Flags

- **Alex (power user):** sort on only 3/10 columns (no Rating/Type/City); ActionBar exposes only Export CSV (no bulk delete); no shortcut to open filter; sort glyph gives no direction feedback.
- **Sam (a11y):** `FetchingIndicator` `aria-hidden` throughout — no fetch announcement; rating cell announces bare "4.5" with star icon unlabeled.

## Questions to Consider

1. Is a 10-column table the right primary view, or a Tiles/list toggle that lets Traits/Amenities/Parking collapse?
2. Why no live result count in the filter drawer? Apply-then-discover-zero teaches the wrong pattern.
