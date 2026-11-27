import { cn } from '@marigold/system';
import { NonModal } from '../Overlay/NonModal';
import type { NonModalProps } from '../Overlay/NonModal';

// Props
// ---------------
/**
 * The open state is not a prop here: `Drawer` resolves it and publishes it
 * through `OverlayTriggerStateContext`, which `NonModal` reads. On small
 * screens the Drawer renders a `Sheet` instead.
 */
type DrawerModalProps = Omit<
  NonModalProps,
  'open' | 'defaultOpen' | 'onOpenChange'
>;

// Component
// ---------------
export const DrawerModal = ({
  children,
  className,
  ...props
}: DrawerModalProps) => (
  <NonModal {...props} className={cn('fixed z-50', className)}>
    {children}
  </NonModal>
);
