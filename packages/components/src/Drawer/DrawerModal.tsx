import { cn, useSmallScreen } from '@marigold/system';
import { Modal, NonModal } from '../Overlay';
import type { NonModalProps } from '../Overlay/NonModal';

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
    <Modal>{children}</Modal>
  ) : (
    <NonModal
      {...props}
      className={cn('fixed top-0 right-0 bottom-0', className)}
    >
      {children}
    </NonModal>
  );
};
