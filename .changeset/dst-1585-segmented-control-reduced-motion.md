---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

refactor(DST-1585): drive SegmentedControl's reduced-motion scroll from CSS

SegmentedControl now gates its selection-reveal scroll animation with the same
CSS approach as Tabs: the scroll container carries `motion-safe:scroll-smooth`
and the component's `scrollTo` uses `behavior: 'auto'`, which follows that CSS —
animating when motion is allowed and jumping instantly under reduced motion.
This replaces the previous JS `window.matchMedia('(prefers-reduced-motion)')`
check. Behavior is unchanged; the initial mount reveal stays instant. No API
change.
