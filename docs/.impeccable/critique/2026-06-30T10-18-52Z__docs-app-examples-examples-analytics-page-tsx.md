---
target: examples Analytics
total_score: 16
p0_count: 1
p1_count: 2
timestamp: 2026-06-30T10-18-52Z
slug: docs-app-examples-examples-analytics-page-tsx
---

# Critique — Analytics (examples/analytics)

Method: dual-agent (A: design review · B: detector + screenshot evidence)

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                              |
| --------- | ------------------------------- | --------- | ------------------------------------------------------ |
| 1         | Visibility of System Status     | 1         | No time range; user can't know what period stats cover |
| 2         | Match System / Real World       | 2         | "Top venues by capacity" is a directory, not analytics |
| 3         | User Control and Freedom        | 0         | No filter, sort, drill-down, or date picker            |
| 4         | Consistency and Standards       | 3         | Layout consistent; badge misuse breaks semantics       |
| 5         | Error Prevention                | 2         | No empty states; stale ≠ live indistinguishable        |
| 6         | Recognition Rather Than Recall  | 2         | Share% needs mental ranking                            |
| 7         | Flexibility and Efficiency      | 0         | No sort, export, or comparison                         |
| 8         | Aesthetic and Minimalist Design | 3         | Clean & calm; tiles slightly large for density         |
| 9         | Error Recovery                  | 1         | No loading/error/empty state; silent failure           |
| 10        | Help and Documentation          | 2         | Subtitle promises trends; delivers none                |
| **Total** |                                 | **16/40** | **Poor — clean but conceptually hollow**               |

## Anti-Patterns Verdict

**LLM:** Slop, with caveats. The 4-stat-tile row is the canonical hero-metric template; calling it "Analytics" while showing zero analytics is conceptual slop. Execution is restrained (no gradient/animation/colored tiles) — the problem is premise, not pixels. `variant="info"` on rating badges is the secondary tell: decoration masquerading as semantics.

**Detector:** Clean (exit 0).

**Visual evidence:** Four fully-templated identical tiles. Rating badges pale-blue `info`, variable width so the numeric column doesn't align. Traffic numbers right-aligned & consistent. Stat hint text the lowest-contrast on the page. **Copy bug:** "Largest venues by capacity" but data is 500/300/150/600/250/800 — not sorted by capacity. "Traffic by source" panel has no Description (asymmetry vs Top venues).

## What's Working

1. Tonal restraint genuinely good — warm-charcoal holds, no colored tiles or gradient numerals.
2. `Columns` 2:1 split correctly gives venues the wider column.
3. `Panel.Content bleed` on both tables is precise.

## Priority Issues

- **[P0] The analytics page contains no analytics.** Header promises "Trends, breakdowns, and reports"; delivers 4 static numbers + a capacity-sorted directory. No time axis, no drill-down. **Fix:** rename panel honestly ("Venues by capacity"), add a time-range anchor, add a real metric column (Sessions/Tickets sold). → `clarify`
- **[P1] Stat tiles have no time context.** A number without a period is decoration. **Fix:** one shared `<Text variant="muted" sm>` period line ("June 2026") above the Tiles. → `clarify`
- **[P1] `variant="info"` on rating badges is semantic misuse.** Same blue on 4.7 and 2.3; teaches `info`="data I want to highlight," corrupting the model. **Fix A (preferred):** drop the badge, render `★ 4.7` as Text. **Fix B:** map to success/warning/error by score. → `distill` / `colorize`
- **[P2] "Traffic by source" has no visual weight hierarchy.** Share% (the useful column) is the same weight as Sessions. **Fix:** `weight="semibold"` on Share% cells. → `harden`
- **[P3] Subtitle "Trends, breakdowns, and reports." overpromises.** **Fix:** rewrite to match content ("Session volume, venue ratings, and traffic sources"). → `clarify`

## Persona Red Flags

- **Alex (power user):** entire page is a dead end — no sortable columns, no row interaction, no drill from a stat tile (Card has no onPress; possible SYSTEM GAP). Refund rate 1.2% → which venues? No path.
- **Sam (a11y):** `★` (U+2605) announced as "black star"/skipped; no `aria-label` like "Rated 4.7 out of 5"; if score→color is added it must carry a non-visual label.

## Questions to Consider

1. If Refund rate spiked to 8.3%, what would the user do next? There are zero outbound affordances — analytics or analytics wallpaper?
2. Every developer will copy this as the analytics pattern. Should it be labeled a "summary row" pattern, with real analytics requiring at minimum a time axis?
