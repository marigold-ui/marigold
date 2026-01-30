import { type ReactNode, useContext } from 'react';
import type RAC from 'react-aria-components';
import { Dialog, OverlayTriggerStateContext } from 'react-aria-components';
import { useIsHidden } from '@react-aria/collections';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { intlMessages } from '../intl/messages';
import { TrayActions } from './TrayActions';
import { TrayContent } from './TrayContent';
import { TrayModal } from './TrayModal';
import { TrayTitle } from './TrayTitle';
import { TrayTrigger } from './TrayTrigger';

// Props
// ---------------
export interface TrayProps extends Omit<
  RAC.DialogProps,
  'className' | 'style'
> {
  /**
   * Whether the overlay is open (controlled).
   * @default undefined
   */
  open?: boolean;

  /**
   * Handler called when the open state changes.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Whether clicking outside closes the tray.
   * @default true
   */
  dismissable?: boolean;

  /**
   * Whether pressing the escape key closes the tray.
   * @default true
   */
  keyboardDismissable?: boolean;

  /**
   * Children of the tray.
   */
  children?: ReactNode;
}

// Component
// ---------------
export const Tray = ({
  open,
  onOpenChange,
  dismissable = true,
  keyboardDismissable = true,
  children,
  ...props
}: TrayProps) => {
  const state = useContext(OverlayTriggerStateContext);
  const isHidden = useIsHidden();
  const classNames = useClassNames({
    component: 'Tray',
  });

  const openState = open ?? state?.isOpen;
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  // If we are in a hidden tree, we still need to preserve our children.
  // This is important for components like Select that need to maintain state context.
  if (isHidden) {
    return <>{children}</>;
  }

  return (
    <TrayModal
      open={openState}
      dismissable={dismissable}
      onOpenChange={onOpenChange}
      keyboardDismissable={keyboardDismissable}
    >
      <Dialog {...props} className={classNames.container}>
        <CloseButton
          aria-label={stringFormatter.format('closeTray')}
          className={classNames.closeButton}
          onPress={state?.close}
        />

        {children}
      </Dialog>
    </TrayModal>
  );
};

Tray.Trigger = TrayTrigger;
Tray.Title = TrayTitle;
Tray.Content = TrayContent;
Tray.Actions = TrayActions;
