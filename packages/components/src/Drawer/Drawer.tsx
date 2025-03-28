import { useContext, useRef } from 'react';
import type { DialogProps } from 'react-aria-components';
import { Dialog, OverlayTriggerStateContext } from 'react-aria-components';
import type { AriaLandmarkRole } from '@react-aria/landmark';
import { useLandmark } from '@react-aria/landmark';
import { cn, useClassNames } from '@marigold/system';
import { DrawerContext } from './Context';
import { DrawerModal } from './DrawerModal';
import { DrawerTrigger } from './DrawerTrigger';

// CLose Button
// ---------------
interface CloseButtonProps {
  className?: string;
}

const CloseButton = ({ className }: CloseButtonProps) => {
  const ctx = useContext(OverlayTriggerStateContext);
  return (
    <button
      className={cn(
        'h-4 w-4 cursor-pointer border-none p-0 leading-normal outline-0',
        className
      )}
      onClick={ctx?.close}
      slot="dismiss-button"
    >
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        />
      </svg>
    </button>
  );
};

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
   * Show the close button.
   */
  closeButton?: boolean;

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
  closeButton,
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
            'grid [grid-template-areas:"title"_"content"_"actions"]',
            classNames.container
          )}
        >
          {closeButton && <CloseButton className={classNames.closeButton} />}
          {children}
        </Dialog>
      </DrawerContext.Provider>
    </DrawerModal>
  );
};

Drawer.Trigger = DrawerTrigger;
