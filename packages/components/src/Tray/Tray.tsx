import { type ReactNode, useContext } from 'react';
import type RAC from 'react-aria-components';
import {
  Dialog,
  ListStateContext,
  Modal,
  ModalOverlay,
  OverlayTriggerStateContext,
  SelectStateContext,
} from 'react-aria-components';
import { useIsHidden } from '@react-aria/collections';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { TrayActions } from './TrayActions';
import { TrayContent } from './TrayContent';
import { TrayTitle } from './TrayTitle';
import { TrayTrigger } from './TrayTrigger';

// Props
// ---------------
export interface TrayProps extends Omit<
  RAC.DialogProps,
  'className' | 'style'
> {
  /**
   * Whether the overlay is open (controlled).
   * @default undefined
   */
  open?: boolean;

  /**
   * Handler called when the open state changes.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Whether clicking outside closes the tray.
   * @default true
   */
  dismissable?: boolean;

  /**
   * Whether pressing the escape key closes the tray.
   * @default true
   */
  keyboardDismissable?: boolean;

  /**
   * Show the close button.
   * @default false
   */
  closeButton?: boolean;

  /**
   * Children of the tray.
   */
  children?: ReactNode;
}

// Component
// ---------------
export const Tray = ({
  open,
  onOpenChange,
  dismissable = true,
  keyboardDismissable = true,
  closeButton,
  children,
  ...props
}: TrayProps) => {
  const state = useContext(OverlayTriggerStateContext);
  const isHidden = useIsHidden();
  const classNames = useClassNames({
    component: 'Tray',
  });

  const openState = open ?? state?.isOpen;

  // If we are in a hidden tree, we still need to preserve our children.
  // This is important for components like Select that need to maintain state context.
  if (isHidden) {
    return <>{children}</>;
  }

  return (
    <ModalOverlay
      isOpen={openState}
      isDismissable={dismissable}
      onOpenChange={onOpenChange ?? state?.setOpen}
      isKeyboardDismissDisabled={!keyboardDismissable}
      className={({ isEntering, isExiting }) =>
        cn(
          'fixed inset-0 z-40 flex items-end justify-center',
          isEntering ? 'animate-in fade-in duration-300 ease-out' : '',
          isExiting ? 'animate-out fade-out duration-200 ease-in' : '',
          classNames.overlay
        )
      }
    >
      <Modal
        className={({ isEntering, isExiting }) =>
          cn(
            'w-full',
            isEntering ? 'animate-in slide-in-from-bottom duration-300' : '',
            isExiting ? 'animate-out slide-out-to-bottom duration-200' : '',
            classNames.modal
          )
        }
      >
        <Dialog
          {...props}
          className={cn(
            'outline-hidden',
            "grid [grid-template-areas:'title'_'content'_'actions']",
            classNames.container
          )}
        >
          {closeButton && (
            <CloseButton
              aria-label="dismiss tray"
              className={classNames.closeButton}
            />
          )}
          {children}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

Tray.Trigger = TrayTrigger;
Tray.Title = TrayTitle;
Tray.Content = TrayContent;
Tray.Actions = TrayActions;
