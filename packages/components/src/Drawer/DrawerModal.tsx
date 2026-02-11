import RAC, { Modal, ModalOverlay } from 'react-aria-components';
import { cn, useSmallScreen } from '@marigold/system';
import { NonModal } from '../Overlay/NonModal';
import type { NonModalProps } from '../Overlay/NonModal';

// Mobile Modal
// ---------------
const MobileModal = ({ children, ...props }: RAC.ModalOverlayProps) => (
  <ModalOverlay
    {...props}
    className="fixed inset-0 z-50 h-(--visual-viewport-height)"
  >
    <Modal className="flex *:flex-1">{children}</Modal>
  </ModalOverlay>
);

// Props
// ---------------
interface DrawerModalProps extends NonModalProps {
  placement?: 'left' | 'right' | 'top' | 'bottom';
}

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
    <NonModal {...props} className={cn('fixed', className)}>
      {children}
    </NonModal>
  );
};
