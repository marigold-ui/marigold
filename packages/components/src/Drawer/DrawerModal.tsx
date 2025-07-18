import RAC, { Modal, ModalOverlay } from 'react-aria-components';
import { UNSAFE_PortalProvider } from '@react-aria/overlays';
import { cn, useSmallScreen } from '@marigold/system';
import { NonModal } from '../Overlay';
import type { NonModalProps } from '../Overlay';
import { usePortalContainer } from '../Provider';

// Mobile Modal
// ---------------
const MobileModal = ({ children, ...props }: RAC.ModalOverlayProps) => {
  const portal = usePortalContainer();

  return (
    <UNSAFE_PortalProvider getContainer={() => portal as HTMLElement | null}>
      <ModalOverlay
        {...props}
        className="fixed top-0 right-0 bottom-0 left-0 z-40"
      >
        <Modal className="flex *:flex-1">{children}</Modal>
      </ModalOverlay>
    </UNSAFE_PortalProvider>
  );
};

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
