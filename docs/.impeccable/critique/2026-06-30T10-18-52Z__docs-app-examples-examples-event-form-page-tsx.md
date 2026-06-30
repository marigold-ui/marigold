---
target: examples Event Form
total_score: 21
p0_count: 1
p1_count: 2
timestamp: 2026-06-30T10-18-52Z
slug: docs-app-examples-examples-event-form-page-tsx
---

# Critique — Event Form (examples/event-form)

Method: dual-agent (A: design review · B: detector + screenshot evidence)

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                             |
| --------- | ------------------------------- | --------- | ----------------------------------------------------- |
| 1         | Visibility of System Status     | 2         | No inline validation; only post-submit toast          |
| 2         | Match System / Real World       | 3         | "Pricing & tickets" mixes price, upload, legal        |
| 3         | User Control and Freedom        | 1         | Single bottom-only Save; no cancel/draft              |
| 4         | Consistency and Standards       | 3         | Help-text tone inconsistent; some redundant           |
| 5         | Error Prevention                | 1         | `errorMessage` props declared but no validation fires |
| 6         | Recognition Rather Than Recall  | 3         | Good pre-fills; Postcode/City format recall           |
| 7         | Flexibility and Efficiency      | 2         | No shortcut, autosave, or skip-to-section             |
| 8         | Aesthetic and Minimalist Design | 2         | Uniform help-text density dilutes signal              |
| 9         | Error Recovery                  | 1         | Error states props-only; nothing surfaces             |
| 10        | Help and Documentation          | 3         | Progressive disclosure present but mechanical         |
| **Total** |                                 | **21/40** | **Acceptable — structural gaps**                      |

## Anti-Patterns Verdict

**LLM:** Mild, contained slop. Competently assembled (no gradient hero, no shadow soup) but carries the LLM fingerprint: every field narrates itself at the same register; progressive disclosure applied mechanically to every panel. Feels generated-to-spec, not designed. Co-presenters master card is the one moment of genuine character.

**Detector:** Clean (exit 0).

**Visual evidence:** ~20+ small gray helper lines (~11–12px) at/below the AA 4.5:1 floor — most pervasive concern. Postcode noticeably narrower than City (uneven vs the 50/50 pairs elsewhere). Co-presenters card: orange border + warm-tinted fill + orange heading — verify orange-on-cream contrast. Single "Save" sits bottom-left, isolated, small, no Cancel. Accessibility-checkbox block is the longest unbroken text run.

## What's Working

1. Progressive disclosure architecturally correct — `Panel.Collapsible` hides genuinely-secondary fields.
2. Pre-fill/override contract clear & consistent ("Pre-filled… Changes here only apply to this event.").
3. Co-presenters `variant="master"` panel is a spatial landmark in a ~3700px form.

## Priority Issues

- **[P0] Bottom-only Save with no error surfacing.** `errorMessage` props exist but no `validationBehavior`/`isInvalid` — the form _cannot fail visibly_; adopters copy unvalidated forms. **Fix:** `validationBehavior="native"` on `<Form>` + sticky footer (Inline alignX=right) with Save + Cancel. → `harden`
- **[P1] Help-text density — everything at the same volume.** 22 muted full-sentence strings; consequential and obvious read identically. **Fix:** delete restating text, shorten mid-tier to fragments, promote the consequential (Callout/weight) — if no semantic `description` distinction exists, **SYSTEM GAP**. → `clarify`
- **[P1] "Pricing & tickets" = three concerns in one panel.** Price + file upload + T&C URL. **Fix:** split into "Pricing" and "Documents & terms" panels. → `clarify`
- **[P2] Accessibility-checkbox section is a local scroll cliff.** Five checkboxes each with a WCAG-definition description. **Fix:** collapse per-checkbox copy to one group-level line; tooltip if available. → `simplify`
- **[P3] Co-presenters inverts form/content hierarchy.** Read-only default-partners is primary; the interactive TagField is hidden in the collapsible. **Fix:** promote TagField to primary; demote the read-out to a Description. → `clarify`

## Persona Red Flags

- **Jordan (first-timer):** "Required fields marked with an asterisk" contract breaks — Pricing section marks nothing required (incl. T&C URL with an errorMessage but no `required`). Trust breaks if submit rejects an unmarked field.
- **Casey (mobile/interruption):** ~3700px, no autosave/draft/session persistence, single bottom commit. A call or refresh erases everything — highest abandonment risk.

## Questions to Consider

1. If 80% of fields inherit from org settings, should this be a confirm/override UI (3 fields for the common case) rather than a full first-time-setup form every time?
2. Does collapsing every "Additional details" reduce load, or hide content that may need attention with no signal it does?
