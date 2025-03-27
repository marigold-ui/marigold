// isDismissable={isDismissible} isKeyboardDismissDisabled={isKeyboardDismissDisabled}
import type { ModalOverlayProps } from 'react-aria-components';
import { Modal, ModalOverlay } from 'react-aria-components';
import { usePortalContainer } from '../Provider';

// Props
// ---------------
export interface DrawerModalProps
  extends Omit<
    ModalOverlayProps,
    | 'isOpen'
    | 'isDismissable'
    | 'isKeyboardDismissDisabled'
    | 'className'
    | 'style'
  > {
  /**
   * Whether the overlay is open by default (controlled).
   * @default undefined
   */
  open?: boolean;
  /**
   * Whether to close the modal when the user interacts outside it.
   * @default false
   */
  dismissable?: boolean;
  /**
   * Whether pressing the escape key closes the modal.
   * @default true
   */
  keyboardDismissable?: boolean;
}

// Component
// ---------------
export const DrawerModal = ({
  children,
  open,
  dismissable,
  keyboardDismissable = true,
  ...rest
}: DrawerModalProps) => {
  const portal = usePortalContainer();
  const props: ModalOverlayProps = {
    isOpen: open,
    isDismissable: dismissable,
    isKeyboardDismissDisabled: !keyboardDismissable,
    ...rest,
  };

  return (
    <ModalOverlay
      // className="fixed inset-0"
      UNSTABLE_portalContainer={portal as HTMLElement}
      {...props}
    >
      <Modal className="fixed top-0 right-0 bottom-0" {...props}>
        {children}
      </Modal>
    </ModalOverlay>
  );
};
