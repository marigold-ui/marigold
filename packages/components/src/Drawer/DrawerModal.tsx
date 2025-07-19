import RAC, { Modal, ModalOverlay } from 'react-aria-components';
import { cn, useSmallScreen } from '@marigold/system';
import { NonModal } from '../Overlay';
import type { NonModalProps } from '../Overlay';

// Mobile Modal
// ---------------
const MobileModal = ({ children, ...props }: RAC.ModalOverlayProps) => (
  <ModalOverlay
    {...props}
    className="fixed inset-0 z-40 h-(--visual-viewport-height)"
  >
    <Modal className="flex *:flex-1">{children}</Modal>
  </ModalOverlay>
);

// Props
// ---------------
export type DrawerModalProps = NonModalProps;

// Component
// ---------------
export const DrawerModal = ({
  children,
  className,
  ...props
}: DrawerModalProps) => {
  const isSmallScreen = useSmallScreen();

  return isSmallScreen ? (
    <MobileModal>{children}</MobileModal>
  ) : (
    <NonModal
      {...props}
      className={cn('fixed top-0 right-0 bottom-0', className)}
    >
      {children}
    </NonModal>
  );
};
