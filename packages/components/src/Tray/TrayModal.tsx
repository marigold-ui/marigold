import { Modal, ModalOverlay } from 'react-aria-components';
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

export const TrayModal = ({ children, ...props }: TrayModalProps) => {
  const classNames = useClassNames({ component: 'Tray' });

  return (
    <ModalOverlay
      {...props}
      isDismissable={props.dismissable}
      className={({ isEntering, isExiting }) =>
        cn(
          isEntering ? 'animate-in fade-in duration-400 ease-out' : '',
          isExiting ? 'animate-out fade-out duration-300 ease-in' : '',
          classNames.overlay
        )
      }
    >
      <Modal
        className={({ isEntering, isExiting }) =>
          cn(
            'group/tray w-full',
            isEntering
              ? 'animate-in slide-in-from-bottom duration-400 ease-out'
              : '',
            isExiting
              ? 'animate-out slide-out-to-bottom duration-300 ease-in'
              : ''
          )
        }
      >
        {children}
      </Modal>
    </ModalOverlay>
  );
};
