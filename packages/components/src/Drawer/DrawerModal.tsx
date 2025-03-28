import { cn } from '@marigold/system';
import { NonModal, NonModalProps } from '../Overlay/NonModal';

// Props
// ---------------
export interface DrawerModalProps extends NonModalProps {}

// Component
// ---------------
export const DrawerModal = ({
  children,
  className,
  ...props
}: DrawerModalProps) => {
  return (
    <NonModal
      {...props}
      data-entering
      className={cn('fixed top-0 right-0 bottom-0', className)}
    >
      {children}
    </NonModal>
  );
};
