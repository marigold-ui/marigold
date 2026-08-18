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
