---
'@marigold/theme-rui': minor
---

fix(DST-1640): give the `Sidebar.Rail` an overflow affordance and a footer seam

When a rail's top-level list outgrew the viewport it scrolled, but nothing except the scrollbar said so, and the pinned footer had no seam against the scrolling list, so the two ran together and the scrollbar ended against a hard footer edge. Two scroll-state-aware cues now sit on top of the scrollbar, and a rail that fits still shows no extra chrome:

- The list fades its overflowing edges via a new `ui-scroll-mask-y` utility, the block-axis twin of `ui-scroll-mask-x` (already behind `Tabs` and `SegmentedControl`). `scroll-padding` keeps a focused tile clear of the fade so its focus ring is never half-erased.
- The footer takes the `ui-scroll-seam-*` top hairline the single-column sidebar's footer already had, fading out as the list bottoms out. Being a following sibling of the list is not enough to see its named scroll timeline, so the rail column hoists the name with `ui-scroll-seam-scope`. That scope belongs on the column and no higher: the section panel's `nav` declares the same name, and two declarations in one scope are ambiguous, which kills the animation.

`ui-scroll-mask-y` differs from the horizontal version in two ways. Its fade defaults narrower (1.25rem), because a row is shorter than a horizontal scroller is wide and 2.5rem would swallow a whole one. And it keeps the scrollbar, where `ui-scroll-mask-x` hides it: a horizontal scrollbar under a row of tabs is unconventional chrome a fade can replace outright, but down the block axis the scrollbar is the conventional affordance and the one a pointer user looks for, so the fade is additive. Pair it with `ui-scrollbar` to theme the scrollbar as usual.

One caveat, since a mask applies to the whole element: the fade also thins the ends of the scrollbar track. The animation ranges keep the thumb clear of it where it matters (the top fade is 0 exactly when the thumb is at the top), and the narrow default keeps the rest subtle, but it is why the utility wants no border of its own on the masked element.

Progressive enhancement follows the horizontal version: without scroll-driven animation support (Firefox as of 153) there is no fade, just the scrollbar. The seam is the one place that fallback shows in the common case, because it pins the hairline on — so a rail that fits still shows a footer divider there, where Chromium shows none. That is the trade the single-column footer already makes, and it is the right way round: the alternative leaves the footer-meets-scrollbar seam this ticket is about unfixed in that engine.

The rail's guidance is unchanged. It is still meant for a small, stable set of sections, and this only makes sure it never looks broken past that, on a short viewport, at high zoom, or with large text.
