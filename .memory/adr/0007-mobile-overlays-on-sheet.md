---
id: ADR-0007
status: accepted # accepted | superseded-by ADR-NNNN
date: 2026-10-09
applies_to:
  - 'packages/components/src/Overlay/**'
  - 'packages/components/src/Tray/**'
  - 'packages/components/src/Drawer/**'
  - 'packages/components/src/Sidebar/SidebarModal.tsx'
---

# 0007. Mobile edge overlays build on one internal Sheet primitive

## Context

Three components present an edge-anchored modal overlay on small screens, and each built its own shell:

- `Tray` (`TrayModal.tsx`) hand-rolled swipe-to-dismiss on `motion`: `AnimatePresence`, drag controls, an inertia snap-back and a reduced-motion branch. Each fix added a workaround — the content/chrome gesture split from DSTSUP-272 (`TRAY_CONTENT_ATTR`, `dragListener={false}`, `touch-none` chrome), the visual-viewport sizing and min-height pin from DST-1739 — and a known focus-restore race with `AnimatePresence` stayed open.
- `Drawer` on small screens (`DrawerModal.tsx` → `MobileModal`) is a full-screen `ModalOverlay` with no animation, no swipe and no backdrop.
- `Sidebar` on small screens (`SidebarModal.tsx`) is a `ModalOverlay` with a theme keyframe slide-in from the physical left.

React Aria Components 1.22.0 (2026-10-08) added `Sheet`: an edge overlay whose swipe, snap points, stacking and software-keyboard handling run on native scroll snapping. Two facts about it shaped this decision, both read from `react-aria-components/src/Sheet.tsx`:

- `SheetOverlay` always renders `ModalOverlay`. There is no non-modal mode.
- A swipe calls `state.close()` only once the scroll has carried the sheet off screen. There is no point before that at which a consumer could veto the dismissal.

## Decision

**Edge overlays on small screens must render through one internal `Sheet` primitive** in `packages/components/src/Overlay/`, exported `/** @internal */` next to `Popover`, `Modal` and `NonModal`. It wraps RAC's `SheetOverlay`, `SheetBackdrop`, `Sheet` and `SheetContent`, takes its styling from a theme `Sheet` component, and owns the backdrop, dismissal and z-index (`z-50`, per [ADR-0003](0003-z-index-scale.md)). `Tray`, the mobile `Drawer` and the mobile `Sidebar` keep their own parts and compose it.

**Edge follows purpose.** Contextual tasks come from the bottom: `Tray`, and the mobile `Drawer` at near-full height with a backdrop strip left showing. Navigation comes from the start edge: the mobile `Sidebar`, still full width with its close button.

**The desktop `Drawer` stays on `NonModal`.** Its purpose is a `complementary` landmark the user works alongside, which a modal overlay cannot be.

**Dismissal is one flag.** The primitive exposes `dismissable` (mapped to `!preventDismissal`), because RAC cannot separate Escape from swipe and outside press. Protecting unsaved form data is the consumer's job: turn dismissal off while the form is dirty and confirm on the explicit close path with `useConfirmation`.

There is no public `Sheet` component. The primitive starts minimal: no snap points, no stack animation.

## Alternatives rejected

- **Each component calls RAC's `Sheet` directly.** Three places would each decide backdrop, keyframes, z-index and dismissal, which is the drift this replaces.
- **`Sheet` replaces the whole `Drawer`.** It is always modal, so the desktop Drawer would block the page it exists to sit beside.
- **Mobile `Drawer` from the `end` edge, mirroring desktop.** A horizontal swipe fights horizontal gestures inside drawer content (Slider, overflowing Tabs, wide tables), and a full-width end sheet has no backdrop, leaving the close button as the only single-pointer exit.
- **A "confirm before dismiss" hook in `Drawer`.** RAC fires the close after the sheet has left the screen, so this needs an upstream change first.
- **Partial-width mobile `Sidebar` with a backdrop.** A frame design change, not part of a migration. The full-width sheet was a deliberate v18 choice.

## Consequences

- Gesture, keyboard-inset and VoiceOver timing behaviour lives in RAC rather than in our code, and is tested in one place. The DSTSUP-272 and DST-1739 workarounds in `Tray` become removable.
- The mobile and desktop `Drawer` no longer look alike: one slides up, the other slides in from the right. That is intended, and should not be "fixed".
- On mobile, `keyboardDismissable={false}` on `Drawer` also disables swipe and backdrop press, so the Drawer's close button must always render there.
- We now depend on a component that was a week old when this was decided. Expect upstream patches, and note that swipe animations need `animation-timeline: view()` support. RAC falls back without it, which matters for our Firefox story tests.
- `motion` stays a dependency: `ActionBar`, `Tabs`, `SidebarToggleIcon` and `MorphCaret` still use it.
