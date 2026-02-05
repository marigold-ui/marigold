import {
  AnimatePresence,
  animate,
  cubicBezier,
  motion,
  useMotionValue,
} from 'motion/react';
import { useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  OverlayTriggerStateContext,
} from 'react-aria-components';
import type RAC from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

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

// Wrap React Aria modal components so they support motion values.
const MotionModal = motion.create(Modal);
const MotionModalOverlay = motion.create(ModalOverlay);

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

export const TrayModal = ({
  open,
  onOpenChange,
  dismissable = true,
  keyboardDismissable = true,
  children,
}: TrayModalProps) => {
  const classNames = useClassNames({ component: 'Tray' });
  const state = useContext(OverlayTriggerStateContext);
  const h = typeof window !== 'undefined' ? window.innerHeight : 0;
  const y = useMotionValue(h);

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange?.(isOpen);
    if (!isOpen) {
      state?.close();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <MotionModalOverlay
          // Force the modal to be open when AnimatePresence renders it.
          isOpen
          onOpenChange={handleOpenChange}
          isDismissable={dismissable}
          isKeyboardDismissDisabled={!keyboardDismissable}
          className={cn(classNames.overlay)}
        >
          <MotionModal
            className={classNames.container}
            initial={{ y: h }}
            animate={{ y: 0 }}
            exit={{ y: h }}
            transition={staticTransition}
            style={{ y }}
            drag="y"
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
  );
};
