import type { CSSProperties } from 'react';
import { use, useId, useMemo, useRef } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import {
  Dialog,
  type DialogProps,
  OverlayTriggerStateContext,
} from 'react-aria-components/Dialog';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import type { AriaLandmarkRole } from '@react-aria/landmark';
import { useLandmark } from '@react-aria/landmark';
import { cn, useClassNames, useSmallScreen } from '@marigold/system';
import { ResetButtonContext } from '../Button/ResetButtonContext';
import { CloseButton } from '../CloseButton/CloseButton';
import { ActionMenuContext } from '../Menu/ActionMenuContext';
import { intlMessages } from '../intl/messages';
import { useOverlayRootSlotProps } from '../utils/useOverlayRootSlotProps';
import { useSlot } from '../utils/useSlot';
import { DrawerContext, DrawerNestingContext } from './Context';
import { DrawerActions } from './DrawerActions';
import { DrawerContent } from './DrawerContent';
import { DrawerDescription } from './DrawerDescription';
import { DrawerHeader } from './DrawerHeader';
import { DrawerModal } from './DrawerModal';
import { DrawerTitle } from './DrawerTitle';
import { DrawerTrigger } from './DrawerTrigger';
import { useDrawerCoordination } from './useDrawerCoordination';

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
  'aria-label': ariaLabel,
  ...props
}: DrawerProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const titleId = useId();
  const classNames = useClassNames({
    component: 'Drawer',
    variant,
    size,
  });
  // `hasTitle` gates the `aria-labelledby` wiring below. Unlike Card/Panel we
  // do not emit a "missing accessible name" warning here: a Drawer renders
  // (and runs this hook) while still closed, when its title is not mounted, so
  // the check would fire spuriously. RAC's `<Dialog>` already warns about an
  // unlabelled dialog at open time.
  const [titleSlotRef, hasTitle] = useSlot(!ariaLabel);

  const ctx = use(OverlayTriggerStateContext);

  // Resolve render-function children up front (mirroring `<Dialog>`) so the
  // slot Provider below always receives plain `ReactNode`.
  const resolvedChildren =
    typeof children === 'function'
      ? children({ close: ctx?.close ?? (() => {}) })
      : children;

  // Called here (not in a child) so it reads the ancestor's `DrawerNestingContext`,
  // not the provider this component publishes below.
  useDrawerCoordination();

  /**
   * On smaller screens the we render a modal dialog instead of a non-modal drawer
   * and need to adjust the role and props accordingly.
   */
  const isSmallScreen = useSmallScreen();
  const landmarkAria = useLandmark({ ...props, role }, ref);
  const landmarkProps = isSmallScreen ? {} : landmarkAria.landmarkProps;

  const { headingProps: rootHeadingProps, textProps } = useOverlayRootSlotProps(
    { classNames, titleId, titleSlotRef }
  );

  const drawerContextValue = useMemo(
    () => ({ variant, size, classNames, titleId, hasTitle, titleSlotRef }),
    [variant, size, classNames, titleId, hasTitle, titleSlotRef]
  );

  return (
    <ResetButtonContext>
      <DrawerModal
        className={classNames.overlay}
        open={open}
        keyboardDismissable={keyboardDismissable}
        data-testid="drawer-modal"
      >
        <DrawerNestingContext value={true}>
          <DrawerContext value={drawerContextValue}>
            <Dialog
              {...props}
              // Override RAC here so we can set an appropriate role
              {...(landmarkProps as any)}
              aria-label={ariaLabel}
              aria-labelledby={
                !ariaLabel && hasTitle ? titleId : props['aria-labelledby']
              }
              className={cn(
                'h-(--visual-viewport-height) outline-none',
                // Use single quotes, in some enviroments the class is not correctly applied otherwise
                "grid [grid-template-areas:'title'_'content'_'actions']",
                classNames.container
              )}
            >
              {closeButton && (
                <CloseButton
                  aria-label={stringFormatter.format('dismissDrawer')}
                  style={{ '--i': 0 } as CSSProperties}
                  className={cn('z-80', classNames.closeButton)}
                  onPress={ctx?.close}
                />
              )}
              <Provider
                values={[
                  [HeadingContext, rootHeadingProps],
                  [TextContext, textProps],
                  [ActionMenuContext, {}],
                ]}
              >
                {resolvedChildren}
              </Provider>
            </Dialog>
          </DrawerContext>
        </DrawerNestingContext>
      </DrawerModal>
    </ResetButtonContext>
  );
};

Drawer.Trigger = DrawerTrigger;
Drawer.Header = DrawerHeader;
Drawer.Title = DrawerTitle;
Drawer.Description = DrawerDescription;
Drawer.Content = DrawerContent;
Drawer.Actions = DrawerActions;
