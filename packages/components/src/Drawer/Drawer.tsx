import type { CSSProperties } from 'react';
import { useContext, useRef } from 'react';
import type { DialogProps } from 'react-aria-components';
import { Dialog, OverlayTriggerStateContext } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import type { AriaLandmarkRole } from '@react-aria/landmark';
import { useLandmark } from '@react-aria/landmark';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { intlMessages } from '../intl/messages';
import { DrawerContext } from './Context';
import { DrawerActions } from './DrawerActions';
import { DrawerContent } from './DrawerContent';
import { DrawerModal } from './DrawerModal';
import { DrawerTitle } from './DrawerTitle';
import { DrawerTrigger } from './DrawerTrigger';

// Props
// ---------------
export interface DrawerProps extends Omit<
  DialogProps,
  'className' | 'style' | 'isOpen' | 'role'
> {
  size?: 'xsmall' | 'small' | 'medium' | (string & {});
  variant?: string;
  /**
   * Whether the overlay is open by default (controlled).
   * @default undefined
   */
  open?: boolean;

  /**
   * Whether pressing the escape key closes the modal.
   * @default true
   */

  /**
   * The placement of the drawer on the screen.
   * @default right
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';

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
  size = 'medium',
  variant,
  open,
  keyboardDismissable,
  closeButton,
  role = 'complementary',
  placement = 'right',
  ...props
}: DrawerProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const classNames = useClassNames({
    component: 'Drawer',
    variant,
    size,
  });

  const ctx = useContext(OverlayTriggerStateContext);

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
      data-testid="drawer-modal"
      data-placement={placement}
    >
      <DrawerContext.Provider value={{ variant, size }}>
        <Dialog
          {...props}
          // Override RAC here so we can set an appropriate role
          {...(landmarkProps as any)}
          className={cn(
            'h-(--visual-viewport-height) outline-none',
            // Use single quotes, in some enviroments the class is not correctly applied otherwise
            "grid [grid-template-areas:'title'_'content'_'actions']",
            classNames.container
          )}
          data-placement={placement}
        >
          {closeButton && (
            <CloseButton
              aria-label={stringFormatter.format('dismissDrawer')}
              style={{ '--i': 0 } as CSSProperties}
              className={cn('z-80', classNames.closeButton)}
              onPress={ctx?.close}
            />
          )}
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
