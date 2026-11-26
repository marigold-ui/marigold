import { use } from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components/Dialog';
import { cn } from '@marigold/system';
import { NonModal } from '../Overlay/NonModal';
import type { NonModalProps } from '../Overlay/NonModal';
import { Sheet } from '../Overlay/Sheet';
import type { SheetProps } from '../Overlay/Sheet';

// Props
// ---------------
/**
 * The open state is not a prop here: `Drawer` resolves it and publishes it
 * through `OverlayTriggerStateContext`, which both paths read.
 */
type DrawerModalProps = Omit<
  NonModalProps,
  'open' | 'defaultOpen' | 'onOpenChange'
>;

// Desktop
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

// Small screens
// ---------------
type DrawerSheetProps = Omit<SheetProps, 'open' | 'onOpenChange' | 'position'>;

/**
 * A bottom sheet (ADR-0007). It is the dialog itself, so dialog props (the
 * accessible name) go here and the Drawer renders no `<Dialog>` inside it.
 */
export const DrawerSheet = (props: DrawerSheetProps) => {
  const state = use(OverlayTriggerStateContext);

  return (
    <Sheet
      {...props}
      position="bottom"
      open={state?.isOpen}
      onOpenChange={state?.setOpen}
    />
  );
};
