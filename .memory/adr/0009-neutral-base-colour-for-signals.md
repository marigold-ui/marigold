---
id: ADR-0009
status: accepted # accepted | superseded-by ADR-NNNN
date: 2026-11-19
applies_to:
  - 'themes/theme-rui/src/tokens.css'
---

# 0009. The product chrome is neutral; colour is reserved for signals

## Context

The previous Reservix Core theme painted the product in its brand colours. Orange (`#fa8005`) was the primary button, the selected row, the active menu item, a Saalplan category and occasionally a warning. Body text was brown (`#511e04`), links and every event name were dark red (`#990000`), table headers grey (`#808080`) on beige rows (`#ecebe6`). Users had worked with this for ten years and more.

RUI replaced it with a charcoal base (`--color-charcoal-*`, oklch hue 54, near-neutral), Inter, and hierarchy carried by size, weight, spacing and grey steps. Colour stays for status and feedback: red for errors and destructive actions, yellow for warnings, green for success, blue for links and information. The orange stays the brand colour on the website, in print and at trade fairs, outside the product.

Users miss the orange, and the reaction reaches Vertrieb, Service and Betreuung, who have to answer it. Two further complaints came with it: controls are bigger, and some lists show one row fewer on the first screen. Without a recorded reason, "bring the orange back" or "make it denser again" returns every quarter as a styling preference.

The question was never whether the old look was ugly. It was that one hue did five jobs, so none of them could be read from the colour.

## Decision

**The product chrome must be neutral.** Surfaces, text, borders, navigation and primary actions use the charcoal scale and white. The brand orange must not be used as a chrome or accent colour inside the product. Brand and product chrome are different things: a colourful logo with a near-monochrome working surface is the common pattern (Google's logo against Gmail's inbox).

**Colour must carry meaning, and only meaning.** A hue in the product says something about state: error, warning, success, information, or a category the user assigned (Saalplan categories). A colour that does not mean something must not be added for decoration or emphasis.

**Hierarchy must come from typography, spacing and grey steps, not hue.** Size and weight set reading order; `secondary` (charcoal-600) is the lightest grey allowed for text; charcoal-500 must not be used for text, because it falls below 4.5 : 1 (see Consequences).

**Controls stay at 36px (`--spacing-control`), 32px for small ones.** The old 24px controls sat exactly on the WCAG 2.2 minimum target size. Dense data tables get density through `Table size="compact"`, not through smaller controls everywhere.

## Evidence

What the research supports is narrower than "neutral is faster". It supports: a calm base makes a signal easier to find and lowers the risk of error. It does not support a claim like "RUI makes users X % faster", and none was measured.

- **Hierarchy without relying on hue.** NN/g, [Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/): hierarchy comes from "variations in color and contrast, scale, and grouping"; "Do not rely only on color to communicate visual hierarchy"; "If everything is contrasted, then nothing stands out." Carbon's [typography](https://carbondesignsystem.com/elements/typography/overview/) uses "scales, styles, and weights to create hierarchy"; Atlassian: "Use visual hierarchy and space to simplify complex information."
- **Signals need a quiet background.** NN/g, [signal-to-noise](https://www.nngroup.com/articles/signal-noise-ratio/): use emphasis "sparingly. Only highlight the essential information." Visual search is most efficient when target and distractors differ and distractors resemble each other (Duncan & Humphreys 1989). Under the old theme a red error sat among dark-red names and orange accents, which is the worst case. Moacdieh & Sarter 2017 (IEEE THMS): high data density and poor organisation increase response time and error rate, and poor organisation makes density worse.
- **Bigger targets.** NN/g, [Fitts's law](https://www.nngroup.com/articles/fitts-law/): people are "faster to click, tap, or hover on bigger targets", and "error rates go down as target sizes increase". [WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) targets accidental activation of adjacent controls, which matters for row actions such as "bearbeiten" next to "Verkauf schließen".
- **Looks change perception, tasks change usability.** NN/g, [aesthetic-usability effect](https://www.nngroup.com/articles/aesthetic-usability-effect/): people believe better-looking things work better "even if they aren't actually more effective". NN/g defines [usability](https://www.nngroup.com/articles/usability-101-introduction-to-usability/) by task success, efficiency, errors and satisfaction.
- **The backlash is expected.** Nielsen, [Fresh vs. Familiar](https://www.nngroup.com/articles/fresh-vs-familiar-aggressive-redesign/): "prepare for a flood of angry email". Sedley & Müller, [change aversion](https://research.google/pubs/minimizing-change-aversion-for-the-google-drive-launch/) (CHI 2013): some aversion is inevitable and can be managed. Spool (2012): users hate the experience of change when they suddenly feel incompetent, which points at continuity of workflows, not at colour.

## Measurements

Event overview (`Veranstaltungsübersicht`), old theme against RUI, screenshots at 2×, values in CSS px. One screen, test data, slightly different data and window heights, so ratios, not guarantees.

| What                                  | Old              | RUI              |
| ------------------------------------- | ---------------- | ---------------- |
| Control height                        | 24               | 36 (+50 %)       |
| Four table rows                       | 87/87/87/67, 328 | 69/93/69/69, 300 |
| First row starts at                   | 342              | 453 (+111)       |
| Fully visible rows in an 836px window | 5                | 4                |

Rows got about 9 % more compact, because statuses now sit side by side instead of stacked. The loss of a row on the first screen comes from the search and filter area above the table, not from the rows.

## Alternatives rejected

- **Keep orange as the primary or accent colour.** It is what users ask for. It would keep the hue that competes with every warning and status, and put a brand colour back on the most frequent control, where it means "click here" and "Reservix" at once.
- **A user setting for the old colour scheme.** It doubles every visual review and screenshot test, keeps the old meaning collisions alive for whoever turns it on, and Vertrieb would have to explain two products. A per-table density setting answers the real complaint behind most requests.
- **A neutral base with a coloured navigation or header.** It keeps the brand visible but puts the loudest colour on the least important part of the screen.
- **Smaller controls to win back density.** 24px is the WCAG floor and raises misclicks on adjacent row actions. Density belongs in `Table size="compact"` and in a shorter filter area.
- **Argue that scrolling more does not matter.** The evidence does not support it: NN/g finds about 57 % of viewing time above the fold, and NN/g's content-dispersion research shows spreading content "causes an increase in cognitive load and interaction costs". The honest position is that the space above the table is a cost to reduce, not a non-issue.

## Consequences

- **What it makes easy.** A red or yellow element is a real signal, because nothing else is red or yellow. New components need no colour decision beyond picking the status. Contrast is checked once on the token level: charcoal-600 is 5.5 : 1 on white and 5.0 : 1 on the page background, charcoal-900 above 15 : 1.
- **What it makes hard.** Long tables lose some row separation that beige rows and borders used to give (NN/g on [data tables](https://www.nngroup.com/articles/data-tables/): zebra striping and light borders help users keep their place). Screens with many signals at once (several statuses per row) can turn noisy again, so status badges must stay quiet in shape and size.
- **What we live with.** The first screen of list pages shows less, and long-time users feel slower in the first weeks whether or not they are. Users who browse rather than search are real: in the Buchungsliste 89 % of Veranstalter viewers never use the search form, so "just use search" is not an answer. The follow-ups are a shorter filter area, `compact` on dense overview tables, and before/after task measurement (success, time, perceived effort) rather than opinion.
- **Communication.** The explanation lives in the internal DST blog post "Wo ist das Orange hin?" and, for conversations with customers, in the page "Argumentationshilfe: Wo ist das Orange hin?" for Betreuung, Vertrieb and Service.
