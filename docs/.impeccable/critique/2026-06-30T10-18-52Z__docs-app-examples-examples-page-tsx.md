---
target: examples Dashboard
total_score: 19
p0_count: 1
p1_count: 1
timestamp: 2026-06-30T10-18-52Z
slug: docs-app-examples-examples-page-tsx
---

# Critique — Dashboard (examples/page.tsx)

Method: dual-agent (A: design review · B: detector + screenshot evidence)

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                               |
| --------- | ------------------------------- | --------- | ------------------------------------------------------- |
| 1         | Visibility of System Status     | 2         | No loading/error/empty states modelled anywhere         |
| 2         | Match System / Real World       | 3         | Metric labels & activity log match ticketing-ops models |
| 3         | User Control and Freedom        | 1         | No actions on activity rows; no drill-deeper            |
| 4         | Consistency and Standards       | 3         | Idiomatic; stat cards use raw `<img>` not Avatar        |
| 5         | Error Prevention                | 1         | Percentages shown with no good/bad context              |
| 6         | Recognition Rather Than Recall  | 3         | Labels always visible; deltas give context              |
| 7         | Flexibility and Efficiency      | 1         | No keyboard shortcut, quick-filter, or sort             |
| 8         | Aesthetic and Minimalist Design | 3         | Clean; 4-stat grid orphans at mid widths                |
| 9         | Error Recovery                  | 0         | `byId()` can return undefined → blank cells             |
| 10        | Help and Documentation          | 2         | Shell-level help only, no page guidance                 |
| **Total** |                                 | **19/40** | **Poor→Acceptable: solid base, real gaps**              |

## Anti-Patterns Verdict

**LLM:** Not slop. The four-stat row flirts with the hero-metric template but restraint saves it — no gradient text, no eyebrows, no glass; orange appears exactly once (Create event CTA) + Master badge. Playful nicknames read as intentional character.

**Detector:** Clean (exit 0). Pure Marigold-component composition; no raw HTML/CSS for slop rules to catch.

**Visual evidence:** Stat hint text ("+12% vs last month") and the page description render as small light-gray (`variant="muted"` / `xs`) at the contrast floor. Activity & team panels are unequal height (content-driven). "Summer Sound Festival" cell wraps to two lines. Team badges sit at inconsistent x-positions across rows (long names displace them).

## What's Working

1. Shell composition is exemplary — AppShell + Sidebar + TopNavigation + Breadcrumbs with production-quality slug→ancestor resolution.
2. `Panel.Content bleed` on the activity table is correct — rules run edge-to-edge.
3. North-Star restraint: orange used once, warm-grey surface does its job silently.

## Priority Issues

- **[P0] Silent `undefined` cells in the activity table.** `byId(entry.who)?.name` renders blank when an id is missing — a reference impl teaches developers to ship invisible data gaps. **Fix:** `?? entry.who` fallback + model the case in one row. → `harden`
- **[P1] Stat cards have no visual hierarchy.** Four identical `4xl` numbers give no primacy signal (is Revenue = Active venues?). **Fix:** promote 1–2 hero metrics via `Tiles` width/Columns; `Text` variant differentiation. If `Tiles` can't span, **SYSTEM GAP** (no featured-tile concept). → `typeset`
- **[P2] No empty state / no "view all" on the activity table.** Four hardcoded rows is a demo, not a reference. **Fix:** add an empty-state row + `Panel.Footer` "view all" LinkButton. → `clarify`
- **[P2] Team panel raw `<img className=...>` bypasses the system.** Violates components-only constraint. **Fix:** use Avatar if it exists; if not, **SYSTEM GAP** (no Avatar component) — comment the placeholder. → `audit`
- **[P3] Stat hint text has no semantic polarity.** "+12%" (good) looks identical to a bad delta. **Fix:** `Badge` success/error or conditional `Text` variant. → `colorize`

## Persona Red Flags

- **Sam (a11y):** Create event CTA is last-reached in the header tab order; raw `<img alt="">` is a screen-reader leakage point.
- **Riley (edge cases):** `Tiles tilesWidth="14rem"` with €94,200 at `4xl` risks overflow/awkward wrap in the 2×2 reflow; stats row has no breakpoint matching the `Columns` 60rem collapse.

## Questions to Consider

1. Is a four-card stat row the right reference pattern, or a summary bar that resists the hero-metric trap?
2. The dashboard only models the calm state — what does it look like on a Monday when 3 events need approval?
