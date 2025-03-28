import { useRef } from 'react';
import type { DialogProps } from 'react-aria-components';
import { Dialog } from 'react-aria-components';
import type { AriaLandmarkRole } from '@react-aria/landmark';
import { useLandmark } from '@react-aria/landmark';
import { cn, useClassNames } from '@marigold/system';
import { DrawerContext } from './Context';
import { DrawerModal } from './DrawerModal';
import { DrawerTrigger } from './DrawerTrigger';

// Props
// ---------------
export interface DrawerProps
  extends Omit<DialogProps, 'className' | 'style' | 'isOpen' | 'role'> {
  variant?: string;
  size?: string;

  /**
   * Whether the overlay is open by default (controlled).
   * @default undefined
   */
  open?: boolean;
  /**
   * Whether pressing the escape key closes the modal.
   * @default true
   */
  keyboardDismissable?: boolean;

  /**
   * The `role` property sets the ARIA landmark role for this component,
   * enhancing accessibility by clarifying its purpose to assistive technologies.
   *
   * Only ARIA landmark roles (e.g., "complementary", "search", "banner", "navigation")
   * can be used to ensure proper semantic context. Defaults to `"complementary"`
   * for secondary content (e.g., filters, sidebar) that supports the main content.
   * @default "complementary"
   */
  role?: Exclude<AriaLandmarkRole, 'main'>;
}

// Component
// ---------------
export const Drawer = ({
  children,
  variant,
  size,
  open,
  keyboardDismissable,
  role = 'complementary',
  ...props
}: DrawerProps) => {
  let ref = useRef<HTMLElement | null>(null);
  let { landmarkProps } = useLandmark({ ...props, role }, ref);
  const classNames = useClassNames({ component: 'Drawer', variant, size });

  return (
    <DrawerModal open={open} keyboardDismissable={keyboardDismissable}>
      <DrawerContext.Provider value={{ classNames }}>
        <Dialog
          {...props}
          // Override RAC here so we can set an appropriate role
          {...(landmarkProps as any)}
          className={cn(
            'h-(--visual-viewport-height) outline-none',
            classNames.container
          )}
        >
          {children}
        </Dialog>
      </DrawerContext.Provider>
    </DrawerModal>
  );
};

Drawer.Trigger = DrawerTrigger;
