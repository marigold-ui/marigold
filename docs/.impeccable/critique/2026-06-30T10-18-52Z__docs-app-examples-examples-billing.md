---
target: examples Billing
total_score: 21
p0_count: 2
p1_count: 1
timestamp: 2026-06-30T10-18-52Z
slug: docs-app-examples-examples-billing
---

# Critique — Billing (examples/billing)

Method: dual-agent (A: design review · B: detector + screenshot evidence)

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                           |
| --------- | ------------------------------- | --------- | --------------------------------------------------- |
| 1         | Visibility of System Status     | 1         | Failed invoice buried in row 5; no page-level alert |
| 2         | Match System / Real World       | 3         | "failed" badge needs plain-language human copy      |
| 3         | User Control and Freedom        | 2         | No retry/resolve path for failed invoice            |
| 4         | Consistency and Standards       | 3         | Consistent; minor ghost-button weight issue         |
| 5         | Error Prevention                | 1         | Failed payment has no upstream warning              |
| 6         | Recognition Rather Than Recall  | 3         | Scannable; clear column headers                     |
| 7         | Flexibility and Efficiency      | 3         | Icon-only download acceptable, well-labeled         |
| 8         | Aesthetic and Minimalist Design | 3         | Calm; €480 price hero slightly loud                 |
| 9         | Error Recovery                  | 0         | Zero recovery affordance for failed invoice         |
| 10        | Help and Documentation          | 2         | No tooltip/link/guidance for failed state           |
| **Total** |                                 | **21/40** | **Acceptable on happy path; fails the money path**  |

## Anti-Patterns Verdict

**LLM:** Not slop (caveat: €480 at `4xl` reads like a pricing-landing hero, not an operational ledger). Structure clean, palette holds, constraint respected.

**Detector:** Clean (exit 0).

**Visual evidence:** Status badges carry text labels — meaning NOT color-alone (good). Download is icon-only but has `aria-label="Download INV-…"` (good). Amounts right-aligned & consistent. "Billing email" (`xs` muted) is the lowest-contrast text on the page; "Expires 08/2027" (`sm` muted) also subdued. Download-column header is `&nbsp;` (empty header cell). Three panels evenly spaced.

## What's Working

1. Structural restraint — three Panels (plan / method / history) map to the three billing jobs.
2. `aria-label` on download is specific per row (`Download INV-2026-002`) — production-quality.
3. `Panel.Content bleed` on the invoice table avoids nested-box claustrophobia.

## Priority Issues

- **[P0] Failed invoice has no recovery path.** INV-2026-002 (failed, €420) is the most important fact on the page, surfaced only as a small red badge in row 5/6. **Fix:** conditional `Callout variant="error"` above the panels — "A payment failed. Update your payment method to retry." If no banner/Callout with error variant exists, **SYSTEM GAP** (system has no banner-level alert above a badge). → `harden`
- **[P0] Failed row has no row-level affordance.** Identical download-only action regardless of status implies it's just another completed entry. **Fix:** add "Retry payment" Button in the failed row alongside download. → `harden`
- **[P1] Status semantics + "failed" copy.** Text label present (not pure color-alone) but green/red are perceptually close for deuteranopia at badge size; "failed" doesn't say what/why/recoverable. **Fix:** longer label ("Payment failed") and/or leading icon in Badge if supported (else SYSTEM GAP); add visually-hidden full phrase. → `audit` + `clarify`
- **[P2] "Update payment method" has no variant — reads secondary.** It's the real recovery action but "Change plan" (primary, top-right) outranks it visually. **Fix:** conditionally `variant="primary"` when a failed invoice exists. → `harden`
- **[P3] €480 price oversells for an existing customer.** `4xl` creates a "gulp" on every visit; disrupts the calm North Star. **Fix:** reduce to `2xl`/`xl`, keep semibold. → `quieter`

## Persona Red Flags

- **Jordan (first-timer):** the "failed" badge gives no answer to "is this recoverable / do I owe €420 now?"; recovery action is in a different panel with no visual thread — a two-panel inferential leap.
- **Sam (a11y):** keyboard lands on six consecutive download buttons; the failed-status badge is not focusable, so a keyboard user gets no signal row 5 needs action; green/red distinction unreinforced by icon/shape.

## Questions to Consider

1. The page is organized by data type (plan/method/history); on a page where something went wrong, task-organization beats data-organization — is the panel structure serving the happy path at the cost of the crisis path?
2. What does downloading a _failed_ invoice actually do — is there even a finalized PDF? Identical affordance across statuses hides a data-contract question.
