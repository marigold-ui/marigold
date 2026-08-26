import {
  AnimatePresence,
  animate,
  cubicBezier,
  useDragControls,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import { create } from 'motion/react-m';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { use } from 'react';
import type RAC from 'react-aria-components';
import { OverlayTriggerStateContext } from 'react-aria-components/Dialog';
import { Modal, ModalOverlay } from 'react-aria-components/Modal';
import { cn, useClassNames } from '@marigold/system';
import { MotionFeatures } from '../lazyMotion';
import { TRAY_CONTENT_ATTR } from './Context';

type RemovedProps =
  | 'isOpen'
  | 'isDismissable'
  | 'isKeyboardDismissDisabled'
  | 'style'
  | 'className';

interface TrayModalProps extends Omit<RAC.ModalOverlayProps, RemovedProps> {
  open?: RAC.ModalOverlayProps['isOpen'];
  dismissable?: RAC.ModalOverlayProps['isDismissable'];
  onOpenChange?: RAC.ModalOverlayProps['onOpenChange'];
  keyboardDismissable?: RAC.ModalOverlayProps['isKeyboardDismissDisabled'];
}

// Wrap React Aria modal components so they support motion values. `create`
// comes from `motion/react-m` so these stay part of the lazy-loaded bundle.
const MotionModal = create(Modal);
const MotionModalOverlay = create(ModalOverlay);

const inertiaTransition = {
  type: 'inertia' as const,
  bounceStiffness: 300,
  bounceDamping: 40,
  timeConstant: 300,
};

const staticTransition = {
  duration: 0.5,
  ease: cubicBezier(0.32, 0.72, 0, 1),
};

// Drag-to-dismiss is armed everywhere on the tray except its content — a
// denylist, not an allowlist. `useDragControls` is built for the opposite
// shape (call `start()` from a handle's own `onPointerDown`), which would fail
// safe: anything unrecognised simply would not drag. We keep the denylist so
// consumers that compose their own chrome next to `<Tray.Content>` keep the
// gesture, but it fails open: a swipeable carousel, a slider or any custom
// gesture widget dropped directly under `<Tray>` (i.e. outside `Tray.Content`)
// re-opens DSTSUP-272, and there is no opt-out in either direction. Revisit as
// an allowlist over `[grid-area:drag]`/`title`/`actions` if that shows up in
// practice.
//
// The decision is also made once, at `pointerdown`, and holds for the whole
// gesture: scrolling the content to the top and continuing to pull cannot hand
// off into a dismiss (DSTSUP-272, requirement 9) — the user has to lift and
// start again on the chrome. Follow-up needed for the continuous handoff.
const startsInTrayContent = (target: Element) =>
  target.closest(`[${TRAY_CONTENT_ATTR}]`) !== null;

export const TrayModal = ({
  open,
  onOpenChange,
  dismissable = true,
  keyboardDismissable = true,
  children,
}: TrayModalProps) => {
  const classNames = useClassNames({ component: 'Tray' });
  const state = use(OverlayTriggerStateContext);
  const reducedMotion = useReducedMotion();
  const h = typeof window !== 'undefined' ? window.innerHeight : 0;
  const y = useMotionValue(h);
  const dragControls = useDragControls();

  const startDrag = (event: ReactPointerEvent<Element>) => {
    if (startsInTrayContent(event.target as Element)) {
      return;
    }

    dragControls.start(event);
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange?.(isOpen);
    if (!isOpen) {
      state?.close();
    }
  };

  // Skip framer-motion under reduced motion: AnimatePresence delays unmount,
  // which races with RAC's FocusScope cleanup and prevents the trigger from
  // receiving focus on close. Plain ModalOverlay unmounts synchronously, so
  // FocusScope restores focus as designed. Users without the preference still
  // hit this race — follow-up needed for a full fix.
  if (reducedMotion) {
    return (
      <ModalOverlay
        isOpen={open}
        onOpenChange={handleOpenChange}
        isDismissable={dismissable}
        isKeyboardDismissDisabled={!keyboardDismissable}
        className={cn('z-50', classNames.overlay)}
      >
        <Modal className={classNames.container}>{children}</Modal>
      </ModalOverlay>
    );
  }

  return (
    <MotionFeatures>
      <AnimatePresence>
        {open && (
          <MotionModalOverlay
            // Force the modal to be open when AnimatePresence renders it.
            isOpen
            onOpenChange={handleOpenChange}
            isDismissable={dismissable}
            isKeyboardDismissDisabled={!keyboardDismissable}
            className={cn('z-50', classNames.overlay)}
          >
            <MotionModal
              className={classNames.container}
              initial={{ y: h }}
              animate={{ y: 0 }}
              exit={{ y: h }}
              transition={staticTransition}
              style={{ y }}
              drag="y"
              // Disarming motion's own listener is half the fix: while it is
              // armed, motion sets `touch-action: pan-x` (plus
              // `user-select: none`, `-webkit-touch-callout: none` and
              // `draggable={false}`) on the dragged element, and `pan-x`
              // blocks vertical panning for the whole subtree — a descendant
              // cannot re-allow it, so the content could never scroll. Drag is
              // started manually from `startDrag` instead, and the pieces we
              // still want are re-applied deliberately, scoped to the chrome
              // that can start a drag: `select-none`/`touch-none` in
              // `Tray.tsx`, `TrayHeader.tsx` and `TrayActions.tsx`. The
              // `draggable={false}` motion also dropped is not restored: it is
              // a per-element attribute that does not inherit, so on this
              // `<div>` (not draggable to begin with) it never did anything
              // for the images or links inside the tray. Restoring
              // `dragListener` would silently bring the scroll bug back — see
              // DSTSUP-272.
              dragListener={false}
              dragControls={dragControls}
              onPointerDown={startDrag}
              dragConstraints={{ top: 0 }}
              onDragEnd={(_e, { offset, velocity }) => {
                if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
                  handleOpenChange(false);
                } else {
                  animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
                }
              }}
            >
              {children}
            </MotionModal>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    </MotionFeatures>
  );
};
