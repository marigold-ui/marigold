import type { CSSProperties } from 'react';
import { useContext, useRef } from 'react';
import type { DialogProps } from 'react-aria-components';
import { Dialog, OverlayTriggerStateContext } from 'react-aria-components';
import type { AriaLandmarkRole } from '@react-aria/landmark';
import { useLandmark } from '@react-aria/landmark';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { DrawerContext } from './Context';
import { DrawerActions } from './DrawerActions';
import { DrawerContent } from './DrawerContent';
import { DrawerModal } from './DrawerModal';
import { DrawerTitle } from './DrawerTitle';
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
      aria-label="dismiss drawer"
      style={{ '--i': 0 } as CSSProperties}
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
  const ref = useRef<HTMLElement | null>(null);
  const classNames = useClassNames({ component: 'Drawer', variant, size });

  /**
   * On smaller screens the we render a modal dialog instead of a non-modal drawer
   * and need to adjust the role and props accordingly.
   */
  const isSmallScreen = useSmallScreen();
  const landmarkAria = useLandmark({ ...props, role }, ref);
  const landmarkProps = isSmallScreen ? {} : landmarkAria.landmarkProps;

  return (
    <DrawerModal
      className={classNames.overlay}
      open={open}
      keyboardDismissable={keyboardDismissable}
    >
      <DrawerContext.Provider value={{ variant, size }}>
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
Drawer.Title = DrawerTitle;
Drawer.Content = DrawerContent;
Drawer.Actions = DrawerActions;
